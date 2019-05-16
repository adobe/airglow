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
import prefab, { reducer, BOOTSTRAP_PREFAB } from '@airglow/prefab';
import '../../src/index';

let store;
let prefabs;

describe('PrefabMapIntegration', () => {
  beforeEach(() => {
    store = createStore(call(
      slice('prefab').with(reducer)
    ));

    prefabs = prefab({
      mymap: {
        type: 'map',
        defaultZoom: 9
      },
      testmap: {
        type: 'map'
      }
    });
    store.dispatch({
      type: BOOTSTRAP_PREFAB,
      payload: prefabs
    });
  });

  it('should correctly select the initial values', function () {
    expect(prefabs.mymap.zoom(store.getState())).toBe(9);
    expect(prefabs.mymap.mode(store.getState())).toBe('map');
  });

  it('updates the zoom', () => {
    store.dispatch(prefabs.mymap.zoomInAction());
    expect(prefabs.mymap.zoom(store.getState())).toBe(10);
    store.dispatch(prefabs.mymap.zoomAction(3));
    expect(prefabs.mymap.zoom(store.getState())).toBe(3);
    store.dispatch(prefabs.mymap.zoomOutAction());
    expect(prefabs.mymap.zoom(store.getState())).toBe(2);
  });

  it('updates the mode', () => {
    store.dispatch(prefabs.mymap.toggleModeAction());
    expect(prefabs.mymap.mode(store.getState())).toBe('satellite');
  });

  it('updates the position', () => {
    store.dispatch(prefabs.mymap.positionAction({ longitude: 32, latitude: 17 }));
    expect(prefabs.mymap.position(store.getState())).toEqual([17, 32]);
  });
});
