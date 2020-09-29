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
import { createSelector } from 'reselect';

// Get the default columns
const defaultColumnsPath = R.path(['construct', 'columns']);

// Get the added columns
const addedColumnsPath = R.pathOr({}, ['store', 'addedColumns']);

// Get the hidden columns
const hiddenColumnsPath = R.pathOr([], ['store', 'hiddenColumns']);

export const selectColumns = createSelector(
  defaultColumnsPath,
  addedColumnsPath,
  (defaultColumns, addedColumns) => R.merge(addedColumns, defaultColumns)
);

// Get the hidden columns
export const selectHiddenColumns = createSelector(
  selectColumns,
  hiddenColumnsPath,
  (columns, hiddenColumns) => R.pick(hiddenColumns, columns)
);

// Get the available columns
export const selectVisibleColumns = createSelector(
  selectColumns,
  hiddenColumnsPath,
  (columns, hiddenColumns) => R.omit(hiddenColumns, columns)
);

// Get the available columns
const getColumns = createSelector(
  selectVisibleColumns,
  R.keys
);

export const hasColumn = (state, column) =>
  R.contains(column, getColumns(state));
