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

import * as R from 'ramda';
import { DEFAULT_ZOOM } from '../constants';
import clampZoom from '../util/clamp.map.zoom';

const constructPath = ['construct', 'defaultZoom'];
const zoomPath = ['store', 'zoom'];

const getZoom = state =>
  R.defaultTo(
    R.path(constructPath, state) || DEFAULT_ZOOM,
    R.path(zoomPath, state)
  );
const calcZoom = (current, size) => clampZoom(current + size);

export const buttonZoomReducer = (state, { payload }) =>
  R.assocPath(
    zoomPath,
    calcZoom(getZoom(state), payload.size),
    state
  );

export const zoomReducer = (state, { payload }) =>
  R.assocPath(
    zoomPath,
    payload.zoom,
    state
  );
