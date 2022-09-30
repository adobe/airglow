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

import { createAction } from '@airglow/reducers';

export const ADD_COLUMN           = 'ADD_COLUMN';
export const DESELECT_ROWS        = 'TABLE_DESELECT_ROWS';
export const DO_SORT              = 'TABLE_SORT';
export const HIDE_COLUMN          = 'HIDE_COLUMN';
export const REMOVE_COLUMN        = 'REMOVE_COLUMN';
export const SHOW_COLUMN          = 'SHOW_COLUMN';
export const TOGGLE_ROW           = 'TABLE_TOGGLE_ROW';

export const addColumn = createAction(ADD_COLUMN,
  (construct, column, config) => ({ construct, column, config }));

export const deselectRows = createAction(DESELECT_ROWS,
  (construct, rows) => ({ construct, rows }));

export const doSort = createAction(DO_SORT,
  (construct, column) => ({ construct, column }));

export const hideColumn = createAction(HIDE_COLUMN,
  (construct, column) => ({ construct, column }));

export const removeColumn = createAction(REMOVE_COLUMN,
  (construct, column) => ({ construct, column }));

export const showColumn = createAction(SHOW_COLUMN,
  (construct, column) => ({ construct, column }));

export const toggleRow = createAction(TOGGLE_ROW,
  (construct, row) => ({ construct, row }));
