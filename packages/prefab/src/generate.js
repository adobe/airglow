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

import { mapObjIndexed, propOr, identity } from 'ramda';

import togglePrefab from './builtin/toggle.prefab';
import valuePrefab from './builtin/value.prefab';
import listPrefab from './builtin/list.prefab';

const providers = {};

export default mapObjIndexed(
  ({ type, ...options }, name) =>
    propOr(identity, type, providers)({ name, ...options })
);

export const registerProvider = (name, provider) => { providers[name] = provider; };

// register default providers
registerProvider('list', listPrefab);
registerProvider('toggle', togglePrefab);
registerProvider('value', valuePrefab);
