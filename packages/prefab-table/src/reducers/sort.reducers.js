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
import { hasColumn } from '../selectors/column.selectors';

const sortPath = ['store', 'sort'];
const defaultSortPath = ['construct', 'defaultSort'];

const getSortState = (state) => {
  const sort = R.path(sortPath, state);
  return sort || R.path(defaultSortPath, state);
}

const sortReducer = (state, { payload }) => {
  const sortState = getSortState(state);
  const { column } = payload;
  let newState = {};
  if (hasColumn(state, column)) {
    if (R.path(['column'], sortState) === column) {
      newState = {
        order: R.negate(R.pathOr(-1, ['order'], sortState)),
        column
      };
    } else {
      newState = {
        order: 1,
        column
      };
    }
  }
  return R.assocPath(
    sortPath,
    R.merge(sortState, newState),
    state
  );
};

export { sortReducer };
