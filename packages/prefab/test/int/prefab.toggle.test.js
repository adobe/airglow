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

describe('Prefab ToggleIntegration', () => {
  beforeEach(() => {
    store = createStore(call(
      slice('prefab').with(reducer)
    ));

    prefabs = prefab({
      toggleA: { type: 'toggle' },
      toggleB: { type: 'toggle', defaultValue: true }
    });
    store.dispatch({ type: BOOTSTRAP_PREFAB, payload: prefabs });
  });

  it('should correctly select the initial values', function () {
    expect(prefabs.toggleA.isOpen(store.getState())).toBe(false);
    expect(prefabs.toggleB.isOpen(store.getState())).toBe(true);
  });

  it('should correctly toggle the value', function () {
    prefabs.toggleA.doToggle(store.dispatch);
    expect(prefabs.toggleA.isOpen(store.getState())).toBe(true);
  });

  it('should correctly toggle when using a default', function () {
    prefabs.toggleB.doToggle(store.dispatch);
    expect(prefabs.toggleB.isOpen(store.getState())).toBe(false);
  });
});
