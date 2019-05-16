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

import { createAction } from '@airglow/reducers';

export const TOGGLE_MODE = 'prefab.map.toggle.mode';
export const BUTTON_ZOOM = 'prefab.map.button.zoom';
export const ZOOM = 'prefab.map.zoom';
export const CHANGE_POSITION = 'prefab.map.change.position';

const constructAction = type => construct => createAction(type,
  ({ ...other } = {}) => ({ construct, ...other }));

export const doToggleMode = constructAction(TOGGLE_MODE);
export const doZoom = constructAction(ZOOM);
export const doButtonZoom = (construct, size) => constructAction(BUTTON_ZOOM)(construct)({ size });
export const doChangePosition = constructAction(CHANGE_POSITION);
