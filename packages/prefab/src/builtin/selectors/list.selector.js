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
import { listSet, listAdd, listRemove, listRemoveAt } from '../actions';

const selectValue = curry(
  (name, state) => defaultTo(
    path(['prefab', name, 'construct', 'defaultValue'], state),
    path(['prefab', name, 'store', 'value'], state)
  )
);

const doSet = name =>
  (dispatch, value) => dispatch(listSet(name, value));

const doAdd = name =>
  (dispatch, value) => dispatch(listAdd(name, value));

const doRemove = name =>
  (dispatch, value) => dispatch(listRemove(name, value));

const doRemoveAt = name =>
  (dispatch, value) => dispatch(listRemoveAt(name, value));


export default function toggleSelector(name) {
  return {
    setAction: v => listSet(name, v),
    addAction: v => listAdd(name, v),
    removeAction: v => listRemove(name, v),
    removeAtAction: v => listRemoveAt(name, v),

    doSet: doSet(name),
    doAdd: doAdd(name),
    doRemove: doRemove(name),
    doRemoveAt: doRemoveAt(name),

    value: selectValue(name),
    values: selectValue(name),
    list: selectValue(name)
  };
}
