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
import * as V from '../validators';

const doValidate = R.curry(({
  min,
  max,
  greater,
  less,
  length,
  regex,
  fieldType,
  integer,
  precision
}, value) => {
  const validators = [];

  if (fieldType === 'number') {
    validators.push(V.number);
    if (min) { validators.push(V.min(min)); }
    if (max) { validators.push(V.max(max)); }
    if (greater) { validators.push(V.greater(greater)); }
    if (less) { validators.push(V.less(less)); }
    if (integer) { validators.push(V.integer); }
    if (precision) { validators.push(V.precision(precision)); }
  } else if (fieldType !== 'blob') {
    validators.push(V.string);
    if (min) { validators.push(V.minLength(min)); }
    if (max) { validators.push(V.maxLength(max)); }
    if (length) { validators.push(V.length(length)); }
    if (regex) { validators.push(V.regex(regex)); }

    if (fieldType === 'alphanum') { validators.push(V.alphanum); }
    if (fieldType === 'email') { validators.push(V.email); }
    if (fieldType === 'ip') { validators.push(V.ip); }
    if (fieldType === 'uri') { validators.push(V.uri); }
  }

  if (fieldType === 'json') { validators.push(V.json); }

  const error = R.find(v => v(value))(validators);
  return error ? error(value) : false;
});

export default ({ construct }, value) =>
  doValidate(construct, value);
