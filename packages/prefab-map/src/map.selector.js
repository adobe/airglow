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
import * as A from './actions';
import { DEFAULT_ZOOM } from './constants';

const zoom = name => state =>
  R.defaultTo(
    constructPath(name, 'defaultZoom')(state) || DEFAULT_ZOOM,
    storePath(name, 'zoom')(state)
  );

const constructPath = (name, prop) => R.path(['prefab', name, 'construct', prop]);
const storePath = (name, prop) => R.path(['prefab', name, 'store', prop]);

const mode = name =>
  state => (storePath(name, 'mode')(state) ? 'satellite' : 'map');

const position = name =>
  state => storePath(name, 'position')(state);

export default function mapSelector(name) {
  return {
    position: position(name),
    mode: mode(name),
    zoom: zoom(name),
    toggleModeAction: A.doToggleMode(name),
    positionAction: A.doChangePosition(name),
    zoomOutAction: () => A.doButtonZoom(name, -1),
    zoomInAction: () => A.doButtonZoom(name, 1),
    zoomAction: zoomIn => A.doZoom(name)({ zoom: zoomIn })
  };
}
