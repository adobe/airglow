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

import togglePrefab from './builtin/toggle.prefab';
import valuePrefab from './builtin/value.prefab';
import listPrefab from './builtin/list.prefab';

const providers = {};

const getProvider = type => R.propOr(R.identity, type, providers);

export default (config) => {
  let prefabs = {};

  R.forEachObjIndexed(
    ({ type, ...options }, name) => {
      const results = getProvider(type)({ name, ...options });
      prefabs = { ...prefabs, ...results };
    },
    config
  );
  return prefabs;
};

export const registerProvider = (name, provider) => { providers[name] = provider; };

// register default providers
registerProvider('list', listPrefab);
registerProvider('toggle', togglePrefab);
registerProvider('value', valuePrefab);
