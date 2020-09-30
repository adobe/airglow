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

import columnPrefab from '../column.prefab';

const addedColumnsPath = ['store', 'addedColumns'];

const hiddenColumnsPath = ['store', 'hiddenColumns'];

const addedColumnsLens = R.lensPath(addedColumnsPath);

const hiddenColumnsLens = R.lensPath(hiddenColumnsPath);

export const addColumnReducer = (state, { payload }) => {
  const { column, config } = payload;
  return R.over(addedColumnsLens, R.assoc(column, columnPrefab({ ...config })), state);
};

export const removeColumnReducer = (state, { payload }) => {
  const { column } = payload;
  return R.over(addedColumnsLens, R.dissoc(column), state);
};

export const showColumnReducer = (state, { payload }) => {
  const { column } = payload;
  return R.over(hiddenColumnsLens, R.without([column]), state);
};

export const hideColumnReducer = (state, { payload }) => {
  const { column } = payload;
  const hiddenColumns = R.pipe(
    R.path(hiddenColumnsPath),
    R.append(column),
    R.uniq
  )(state);

  return R.set(hiddenColumnsLens, hiddenColumns, state);
};
