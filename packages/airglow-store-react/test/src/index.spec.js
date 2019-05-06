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

import { call, initialize, slice, reduce } from '@airglow/reducers';
import { REDUCER } from 'airglow';
import storeFactory from '../../src';

let store;

const spawnGetter = (useType, data) => type =>
  ((useType === type) ? data : []);

const reducerGetterArray = spawnGetter(REDUCER, [
  slice('data').with(
    initialize({ name: 'Jimmy' }, call(
      reduce('name').for('updateName')
    ))
  )
]);

describe('Airglow ReactStore', () => {
  beforeEach(() => {
    const factory = storeFactory();
    store = factory.create(reducerGetterArray);
  });
  it('initilizes state properly', () => {
    expect(store.getState()).toMatchSnapshot();
  });
  it('dispatches to all the reducers', () => {
    store.dispatch({ type: 'updateName', payload: 'Dave' });
    expect(store.getState()).toMatchSnapshot();
  });
  it('notifies subscribers', () => {
    const cb = sinon.spy();
    store.subscribe(cb);
    store.dispatch({ type: 'updateName', payload: 'Dave' });
    expect(cb.called).toBe(true);
  });
  it('can unsubscribe', () => {
    const cb = sinon.spy();
    const unsubscribe = store.subscribe(cb);
    unsubscribe();
    store.dispatch({ type: 'updateName', payload: 'Dave' });
    expect(cb.called).toBe(false);
  });
  it('can inject new reducers', () => {
    store.injectReducers([
      slice('address').with(
        initialize({ city: 'Sporksville' }, s => s)
      )
    ]);
    expect(store.getState()).toMatchSnapshot();
  });
  it('ignores empty reducers', () => {
    store.injectReducers();
    expect(store.getState()).toMatchSnapshot();
  });
});
