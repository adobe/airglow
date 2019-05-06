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

import { curry, assoc, reduce } from 'ramda';
import call from './call.reducer';

const extractField = curry(
  (payload, state, field) =>
    assoc(field, payload[field], state)
);

const extractFields = curry(
  (fields, state, { payload }) =>
    reduce(extractField(payload), state, fields)
);

export default (...fields) => call(extractFields(fields));
