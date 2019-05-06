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

export const TOGGLE_ON      = 'PREFAB_TOGGLE_ON';
export const TOGGLE_OFF     = 'PREFAB_TOGGLE_OFF';
export const TOGGLE_SWITCH  = 'PREFAB_TOGGLE_SWITCH';

export const VALUE         = 'PREFAB_VALUE';
export const VALUE_RESET   = 'PREFAB_VALUE_RESET';

export const LIST_SET       = 'PREFAB_LIST_SET';
export const LIST_ADD       = 'PREFAB_LIST_ADD';
export const LIST_REMOVE    = 'PREFAB_LIST_REMOVE';
export const LIST_REMOVE_AT = 'PREFAB_LIST_REMOVE_AT';

const mapConstruct = construct => ({ construct });

export const turnOn = createAction(TOGGLE_ON, mapConstruct);
export const turnOff = createAction(TOGGLE_OFF, mapConstruct);
export const toggle = createAction(TOGGLE_SWITCH, mapConstruct);

const expandPayload = (construct, value) => ({ construct, value });

export const setValue = createAction(VALUE, expandPayload);
export const valueReset = createAction(VALUE_RESET, mapConstruct);

export const listSet = createAction(LIST_SET, expandPayload);
export const listAdd = createAction(LIST_ADD, expandPayload);
export const listRemove = createAction(LIST_REMOVE, expandPayload);
export const listRemoveAt = createAction(LIST_REMOVE_AT, expandPayload);
