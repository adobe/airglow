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

import { path, defaultTo, curry } from 'ramda';
import { setValue, valueReset } from '../actions';

const selectValue = curry(
  (name, state) => defaultTo(
    path(['prefab', name, 'construct', 'defaultValue'], state),
    path(['prefab', name, 'store', 'value'], state)
  )
);

const doChange = name =>
  (dispatch, value) => dispatch(setValue(name, value));

const doReset = name =>
  dispatch => dispatch(valueReset(name));


export default function valueSelector(name) {
  return {
    changeAction: v => setValue(name, v),
    doChange: doChange(name),
    doReset: doReset(name),
    resetAction: valueReset(name),
    value: selectValue(name)
  };
}
