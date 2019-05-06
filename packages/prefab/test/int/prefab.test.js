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
import { reducer, BOOTSTRAP_PREFAB } from '../../src/index';
import countConstruct from './count.construct';

let store;
let prefab;

const select = selectorIn =>
  selectorIn(store.getState(), store.dispatch);

describe('PrefabIntegrationTest', () => {
  beforeEach(() => {
    prefab = {
      counterA: countConstruct({ default: 21, name: 'counterA' }),
      counterB: countConstruct({ name: 'counterB' })
    };
    store = createStore(call(
      slice('prefab').with(reducer)
    ));
    store.dispatch({
      type: BOOTSTRAP_PREFAB,
      payload: prefab
    });
    // selectorB = selector('counterB', );
  });
  it('should correclty set up the store', function () {
    expect(store.getState()).toMatchSnapshot();
  });
  it('should select the default values from the store', function () {
    expect(select(prefab.counterA()).value).toBe(21);
    expect(select(prefab.counterB()).value).toBe(0);
  });
  it('should update the store on dispatch', function () {
    select(prefab.counterA()).onIncrement(3);
    select(prefab.counterA()).onIncrement(3);
    select(prefab.counterB({ multiple: 3 })).onIncrement(2);
    expect(select(prefab.counterA()).value).toBe(27);
    expect(select(prefab.counterB({ multiple: 3 })).value).toBe(6);
  });
});
