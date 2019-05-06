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

import { slice, call } from '@airglow/reducers';
import { createStore } from 'redux';
import prefab, { reducer, BOOTSTRAP_PREFAB } from '../../src';

let store;
let prefabs;

describe('Prefab ListIntegration', () => {
  beforeEach(() => {
    store = createStore(
      call(slice('prefab').with(reducer))
    );

    prefabs = prefab({
      searchA: { type: 'list' },
      searchB: { type: 'list', defaultValue: ['red'] }
    });
    store.dispatch({ type: BOOTSTRAP_PREFAB, payload: prefabs });
  });

  it('should correctly select the initial values', function () {
    expect(prefabs.searchA.value(store.getState())).toMatchSnapshot();
    expect(prefabs.searchB.value(store.getState())).toMatchSnapshot();
  });

  it('should correctly update the value', function () {
    prefabs.searchA.doSet(store.dispatch, ['yellow']);
    expect(prefabs.searchA.value(store.getState())).toMatchSnapshot();
  });

  it('should correctly add values', function () {
    prefabs.searchB.doAdd(store.dispatch, 'green');
    expect(prefabs.searchB.value(store.getState())).toMatchSnapshot();
  });

  it('should correctly remove values', function () {
    prefabs.searchA.doAdd(store.dispatch, 'pink');
    prefabs.searchA.doAdd(store.dispatch, 'purple');
    prefabs.searchA.doRemove(store.dispatch, 'pink');
    expect(prefabs.searchA.value(store.getState())).toMatchSnapshot();
  });

  it('should correctly remove values at index', function () {
    prefabs.searchA.doAdd(store.dispatch, 'pink');
    prefabs.searchA.doAdd(store.dispatch, 'purple');
    prefabs.searchA.doAdd(store.dispatch, 'yellow');
    prefabs.searchA.doAdd(store.dispatch, 'green');
    prefabs.searchA.doRemoveAt(store.dispatch, 2);
    expect(prefabs.searchA.value(store.getState())).toMatchSnapshot();
  });
});
