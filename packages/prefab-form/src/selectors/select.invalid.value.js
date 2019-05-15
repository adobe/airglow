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
import selectCurrentValue from './select.current.value';
import { getConstruct } from './select.store.paths';
import customValidation from '../custom/custom.validation';

const ROOT = 'prefab';
const REQUIRED_ERROR = 'error.required';
const isNull = value => value === undefined || value == null || value === '';
const voidValidator = () => false;

export default R.curry((name, state) => {
  const valueIn = selectCurrentValue(name, state);

  const {
    required,
    validator = voidValidator,
    prevalidate = R.identity
  } = getConstruct(name)(state);

  const value = prevalidate(valueIn);

  if (required && isNull(value)) { return REQUIRED_ERROR; }

  return validator(value) || customValidation(R.path([ROOT, name], state), value);
});
