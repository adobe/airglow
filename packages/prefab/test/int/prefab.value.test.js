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

describe('Prefab ValueIntegration', () => {
  beforeEach(() => {
    store = createStore(call(
      slice('prefab').with(reducer)
    ));

    prefabs = prefab({
      searchA: { type: 'value' },
      searchB: { type: 'value', defaultValue: 'meat' }
    });
    store.dispatch({ type: BOOTSTRAP_PREFAB, payload: prefabs });
  });

  it('should correctly select the initial values', function () {
    expect(prefabs.searchA.value(store.getState())).toBe('');
    expect(prefabs.searchB.value(store.getState())).toBe('meat');
  });

  it('should correctly update the value', function () {
    prefabs.searchA.doChange(store.dispatch, 'fav');
    expect(prefabs.searchA.value(store.getState())).toBe('fav');
  });

  it('should correctly update when using a default', function () {
    prefabs.searchB.doChange(store.dispatch, 'vegi');
    expect(prefabs.searchB.value(store.getState())).toBe('vegi');
  });

  it('should correctly reset the value', function () {
    prefabs.searchA.doChange(store.dispatch, 'fav');
    prefabs.searchA.doReset(store.dispatch);
    expect(prefabs.searchA.value(store.getState())).toBe('');
  });
});
