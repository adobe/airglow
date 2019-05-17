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

export const VALUE_CHANGE      = 'PREFAB_FORM_FIELD_VALUE';
export const BLUR              = 'PREFAB_FORM_FIELD_BLUR';
export const FOCUS             = 'PREFAB_FORM_FIELD_FOCUS';
export const RESET             = 'PREFAB_FORM_FIELD_RESET';
export const FIELD_SUBMIT      = 'PREFAB_FORM_FIELD_SUBMIT';
export const SUBMIT            = 'PREFAB_FORM_SUBMIT';

const mapConstruct = (construct, value) => ({ construct, value });

export const change = createAction(VALUE_CHANGE, mapConstruct);
export const focus = createAction(FOCUS, mapConstruct);
export const blur = createAction(BLUR, mapConstruct);
export const reset = createAction(RESET, mapConstruct);
export const submitField = createAction(FIELD_SUBMIT, mapConstruct);
export const submit = createAction(SUBMIT, mapConstruct);
