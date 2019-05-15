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
import { getConstruct, getStore } from './select.store.paths';

// The value for a field before any edits were made. If source data
// was provided, use that. Otherwise, use the default value.
export const getCleanValue = (name, state) => {
  const construct = getConstruct(name)(state);
  return (construct.sourceSelector && construct.sourceSelector(state))
    || construct.defaultValue;
};

// returns the current value in the state. If value is not set
// it will check for a default value in the construct
export default R.curry((name, state) => R.defaultTo(
  getCleanValue(name, state),
  getStore(name)(state).value
));
