/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/* eslint-disable global-require */
/* eslint-disable import/no-webpack-loader-syntax */

import { compose, applyMiddleware } from 'redux';

import { REDUCER, POST_ENHANCER, ENHANCER, MIDDLEWARE, COMPOSER }
  from 'airglow';

import module from '../../src';

import lazyStore from '../../src/lazy.store';

jest.mock('../../src/lazy.store');
jest.mock('redux', () => (
  {
    compose: jest.fn().mockReturnValue('Composed!'),
    applyMiddleware: jest.fn().mockReturnValue('Applied!')
  }
));

const reducer = 'completeReducer';
const reducerArray = ['arrayReducer1', 'arrayReducer2'];
const spawnGetter = (useType, data) => type =>
  ((useType === type) ? data : []);

const enhancer = 'testEnhancer';
const middleware = 'testMiddleware';
const postEnhancer = 'testPostEnhancer';

const emptyGetter = () => [];
const reducerGetter = spawnGetter(REDUCER, [reducer]);
const reducerGetterArray = spawnGetter(REDUCER, [reducer, reducerArray]);
const enhancerGetter = (type) => {
  if (type === ENHANCER) { return [enhancer]; }
  if (type === MIDDLEWARE) { return [middleware]; }
  if (type === COMPOSER) { return []; }
  return [postEnhancer];
};

let composed = false;
const composerGetter = spawnGetter(COMPOSER, [composer => (...a) => {
  composed = true;
  return composer(a);
}]);

spawnGetter(POST_ENHANCER, [enhancer, middleware, postEnhancer]);

const lazyCall = (i = 0) => lazyStore.mock.calls[0][i];
const composeCall = (i = 0) => compose.mock.calls[0][i];
const applyCall = (i = 0) => applyMiddleware.mock.calls[0][i];
let factory;

describe('Airglow Redux Store', () => {
  beforeEach(() => {
    factory = module();
  });
  afterEach(() => {
    lazyStore.mockClear();
    compose.mockClear();
    applyMiddleware.mockClear();
  });

  it('should create a lazyStore', () => {
    factory.create(emptyGetter);
    expect(lazyStore.mock.calls.length).toBe(1);
  });

  it('should use all the reducer plugins', () => {
    factory.create(reducerGetter);
    expect(lazyCall()).toMatchSnapshot();
  });
  it('should merge array results together', () => {
    factory.create(reducerGetterArray);
    expect(lazyCall()).toMatchSnapshot();
  });
  it('should pass the composed results to the store', () => {
    factory.create(emptyGetter);
    expect(lazyCall(1)).toBe('Composed!');
  });
  it('should send in the enhancers', () => {
    factory.create(enhancerGetter);
    expect(composeCall()).toBe(enhancer);
  });
  it('should send in the applied middleware', () => {
    factory.create(enhancerGetter);
    expect(composeCall(1)).toBe('Applied!');
  });
  it('should use the provided middlewares', () => {
    factory.create(enhancerGetter);
    expect(applyCall()).toBe('testMiddleware');
  });
  it('should send in post enhancers after the middleware', () => {
    factory.create(enhancerGetter);
    expect(composeCall(2)).toBe(postEnhancer);
  });
  it('should use a custom composer if provided', () => {
    factory.create(composerGetter);
    expect(composed).toBe(true);
  });
});
