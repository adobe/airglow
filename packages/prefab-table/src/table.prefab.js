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

import reduce from './reducers';
import tableSelector from './selectors/table.selectors';

import columnPrefab from './column.prefab';

export default ({
  allowsSelection = true,
  allowsMultipleSelection = true,
  name,
  dataSelector,
  defaultSort,
  columns
}) => {
  const selectorInternal = tableSelector(name, dataSelector);
  selectorInternal.allowsSelection = allowsSelection;
  selectorInternal.allowsMultipleSelection = allowsMultipleSelection;
  selectorInternal.tableName = name;
  selectorInternal.dataSelector = dataSelector;
  selectorInternal.defaultSort = defaultSort;
  selectorInternal.columns = processColumns(columns);
  selectorInternal.reduce = reduce;

  return { [name]: { ...selectorInternal } };
};

const processColumns = R.mapObjIndexed(
  (column, name) => columnPrefab({ name, ...column })
);
