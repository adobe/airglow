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

import selector from '../../src/map.selector';

const valueState = {
  prefab: {
    myMap: {
      store: {
        zoom: 12,
        position: [5, 9],
        mode: true
      }
    }
  }
};
const defaultState = {
  prefab: {
    myMap: {
      construct: {
        defaultZoom: 3
      },
      store: {
      }
    }
  }
};

describe('mapSelector', () => {
  const mapSelector = selector('myMap');
  it('uses the default zoom', () => {
    expect(mapSelector.zoom(defaultState)).toBe(3);
  });
  it('uses a default mode', () => {
    expect(mapSelector.mode(defaultState)).toBe('map');
  });
  it('uses the states mode', () => {
    expect(mapSelector.mode(valueState)).toBe('satellite');
  });
  it('uses the states zoom', () => {
    expect(mapSelector.zoom(valueState)).toBe(12);
  });
  it('uses the states position', () => {
    expect(mapSelector.position(valueState)).toEqual([5, 9]);
  });
  it('builds a position action', () => {
    expect(mapSelector.positionAction({ latitude: 12, longitude: -3 })).toMatchSnapshot();
  });
  it('builds a toggle mode action', () => {
    expect(mapSelector.toggleModeAction()).toMatchSnapshot();
  });
  it('builds a zoom in action', () => {
    expect(mapSelector.zoomInAction()).toMatchSnapshot();
  });
  it('builds a zoom out action', () => {
    expect(mapSelector.zoomOutAction({ latitude: 12, longitude: -3 })).toMatchSnapshot();
  });
  it('builds a zoom action', () => {
    expect(mapSelector.positionAction({ zoom: 3 })).toMatchSnapshot();
  });
});
