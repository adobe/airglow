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

import { curry, keys, reduce, assoc } from 'ramda';
import call from './call.reducer';
import { INITIALIZE_ROOT } from './initialize.reducer';

const determineFields = (fields, state) =>
  (fields && fields.length ? fields : keys(state[INITIALIZE_ROOT]));

const resetField = (state, field) =>
  assoc(field, state[INITIALIZE_ROOT][field], state);

const resetFields = curry(
  (fields, state) => reduce(resetField, state, determineFields(fields, state))
);

export default (...fields) => call(resetFields(fields));
