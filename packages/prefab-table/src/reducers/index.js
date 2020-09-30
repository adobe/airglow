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

import { call } from '@airglow/reducers';
import * as T from '../actions';
import { addColumnReducer, hideColumnReducer, removeColumnReducer, showColumnReducer } from './column.reducers';
import { deselectRowsReducer, toggleRowReducer } from './row.reducers';
import { sortReducer } from './sort.reducers';

export default call(
  call(addColumnReducer).for(T.ADD_COLUMN),
  call(deselectRowsReducer).for(T.DESELECT_ROWS),
  call(hideColumnReducer).for(T.HIDE_COLUMN),
  call(removeColumnReducer).for(T.REMOVE_COLUMN),
  call(showColumnReducer).for(T.SHOW_COLUMN),
  call(sortReducer).for(T.DO_SORT),
  call(toggleRowReducer).for(T.TOGGLE_ROW)
);
