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
import {
  addColumn,
  deselectRows,
  doSort,
  hideColumn,
  removeColumn,
  showColumn,
  toggleRow
} from '../actions';
import {
  addedColumns,
  defaultColumns,
  selectHiddenColumns,
  selectVisibleColumns
} from './column.selectors';
import columnSorter from '../util/column.sorter';

const selectColumnSelector = (name, selector) =>
  state => R.pipe(
    R.path(['prefab', name]),
    selector
  )(state);

const selectColumnSorter = name => createSelector(
  selectColumnSelector(name, defaultColumns),
  selectColumnSelector(name, addedColumns),
  selectSortColumn(name),
  (columns, added, sortBy) => R.path([sortBy, 'sorter'], columns) || R.path([sortBy, 'sorter'], added)
);

const selectSortOrder = name => createSelector([
  state => R.path(['prefab', name, 'store', 'sort', 'order'], state),
  state => R.path(['prefab', name, 'construct', 'defaultSort', 'order'], state)
], (storeOrder, defaultOrder) => storeOrder || defaultOrder);

const selectSortColumn = name => createSelector([
  state => R.path(['prefab', name, 'store', 'sort', 'column'], state),
  state => R.path(['prefab', name, 'construct', 'defaultSort', 'column'], state)
], (storeColumn, defaultColumn) => storeColumn || defaultColumn);

const selectSortedData = (data = [], sortBy, sortDirection, sorter) =>
  columnSorter(sortBy, sortDirection, sorter, data);

const selectedData = name =>
  state => R.pathOr([], ['prefab', name, 'store', 'selectedRows'], state);

const selectData = (name, dataSelector) => createSelector(
  [
    dataSelector,
    selectSortColumn(name),
    selectSortOrder(name),
    selectColumnSorter(name)
  ],
  selectSortedData
);

const selectedRows = (name, dataSelector) => createSelector(
  [selectData(name, dataSelector), selectedData(name)],
  (data, rows) => R.map(row => R.indexOf(row, data), rows)
);

const makeState = (name, dataSelector) => createSelector([
  selectColumnSelector(name, selectVisibleColumns),
  selectData(name, dataSelector),
  selectColumnSelector(name, selectHiddenColumns),
  selectedData(name),
  selectedRows(name, dataSelector),
  selectSortColumn(name),
  selectSortOrder(name)
],
(columns, data, hiddenColumns, dataSelected, rowsSelected, sortBy, sortDirection) => ({
  columns,
  data,
  hiddenColumns,
  selectedData: dataSelected,
  selectedRows: rowsSelected,
  sortBy,
  sortDirection
}));

const makeHandlers = name => dispatch => ({
  hideColumn: columnName => dispatch(hideColumn(name, columnName)),
  onHeaderClick: (columnData, columnName) => dispatch(doSort(name, columnName)),
  onRowClick: (row, index) => dispatch(toggleRow(name, row, index)),
  showColumn: columnName => dispatch(showColumn(name, columnName))
});

export default (name, dataSelector) => ({
  addColumnAction: (columnName, config) => addColumn(name, columnName, config),
  deselectRowsAction: () => deselectRows(name),
  handlers: makeHandlers(name),
  removeColumnAction: columnName => removeColumn(name, columnName),
  selectedData: selectedData(name),
  state: makeState(name, dataSelector),
  toggleRowAction: (row, index) => toggleRow(name, row, index)
});
