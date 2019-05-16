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

import { buttonZoomReducer, zoomReducer } from '../../../src/reducers/zoom.reducer';

describe('zoomReducer', () => {
  it('sets the zoom value', () => {
    expect(zoomReducer({}, { payload: { zoom: 7 } })).toMatchSnapshot();
  });
});

describe('buttonZoomReducer', () => {
  const state = { construct: { defaultZoom: 8 } };
  it('zooms of a default value', () => {
    expect(buttonZoomReducer({}, { payload: { size: -1 } })).toMatchSnapshot();
  });
  it('zooms off the provided default', () => {
    expect(buttonZoomReducer(state, { payload: { size: 1 } })).toMatchSnapshot();
  });
  it('clamps the zoom level', () => {
    expect(buttonZoomReducer(state, { payload: { size: 100 } })).toMatchSnapshot();
  });
});
