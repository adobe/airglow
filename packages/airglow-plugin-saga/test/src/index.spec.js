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

import { FEATURE, MIDDLEWARE, BOOTSTRAP_MODULE } from 'airglow';
import * as reduxSaga from 'redux-saga';
import plugin, { SAGA } from '../../src/index';

let engine;
let middleware;

const getCall = (type) => {
  for (let i = 0; i < engine.plugin.callCount; ++i) {
    if (engine.plugin.getCall(i).args[0] === type) {
      return engine.plugin.getCall(i).args[1];
    }
  }
  return null;
};

const lookup = (type) => {
  if (type === SAGA) {
    return [
      ['a', 'b', 'c'],
      ['x', 'y', 'z']
    ];
  }
  return [];
};

const toStrap = {
  sagas: ['x', 'y', 'z']
};

describe('coronaSagaPlugin', () => {
  beforeEach(() => {
    middleware = {
      run: sinon.spy()
    };
    engine = {
      plugin: sinon.spy()
    };
    sinon.stub(reduxSaga, 'default').returns(middleware);
  });
  afterEach(() => {
    reduxSaga.default.restore();
  });

  it('should add the saga middleware', function () {
    plugin()(engine);
    expect(getCall(MIDDLEWARE)).toBe(middleware);
  });
  it('should add the saga feature', function () {
    plugin()(engine);
    expect(getCall(FEATURE)).toBeDefined();
  });
  it('should add the saga bootstrap', function () {
    plugin()(engine);
    expect(getCall(BOOTSTRAP_MODULE)).toBeDefined();
  });

  it('should run the sagas for each plugin that used the saga feature', function () {
    plugin()(engine);
    const feature = getCall(FEATURE);
    feature(lookup);

    expect(middleware.run.callCount).toBe(2);
    expect(middleware.run.firstCall.args[0]).toEqual(['a', 'b', 'c']);
  });

  it('should run each bootstrapped sagas', function () {
    plugin()(engine);
    const bootstrap = getCall(BOOTSTRAP_MODULE);
    bootstrap(toStrap);

    expect(middleware.run.firstCall.args[0]).toEqual(['x', 'y', 'z']);
  });

  it('doesnt bootstrap if null sagas', function () {
    plugin()(engine);
    const bootstrap = getCall(BOOTSTRAP_MODULE);
    bootstrap({});

    expect(middleware.run.callCount).toBe(0);
  });
});
