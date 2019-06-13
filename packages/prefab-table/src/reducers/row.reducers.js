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

const allowsSelectionPath = ['construct', 'allowsSelection'];

const allowsMultipleSelectionPath = ['construct', 'allowsMultipleSelection'];

const selectedRowsPath = ['store', 'selectedRows'];

const selectedRowsLens = R.lensPath(selectedRowsPath);

export const deselectRowsReducer = (state, { payload }) => {
  const { rows } = payload;
  const normalized = !rows
    ? R.view(selectedRowsLens, state)
    : Array.isArray(rows) ? rows : [rows];

  return R.over(selectedRowsLens, R.without(normalized), state);
};

export const toggleRowReducer = (state, { payload }) => {
  if (!R.path(allowsSelectionPath, state)) return state;

  const { row } = payload;

  if (R.indexOf(row, R.pathOr([], selectedRowsPath, state)) >= 0) {
    return R.over(selectedRowsLens, R.without([row]), state);
  }

  return R.path(allowsMultipleSelectionPath, state)
    ? R.over(selectedRowsLens, R.append(row), state)
    : R.set(selectedRowsLens, [row], state);
};
