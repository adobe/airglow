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

const basicSort = (a, b) => {
  if (a < b) { return -1; }
  return (a > b) ? 1 : 0;
};

const defaultSort = (sortBy, sortDirection) => (a, b) =>
  basicSort(a[sortBy], b[sortBy]) * sortDirection;

const getSorter = (sortBy, sortDirection, sorter) => {
  const defaultSorter = defaultSort(sortBy, sortDirection);
  return sorter(defaultSorter)(sortBy, sortDirection) || defaultSorter;
};

const runSorter = (sortBy, sortDirection, sorter, data) => {
  if (!sortBy || !sortDirection || !sorter || !data) {
    return data;
  }

  return R.sort(getSorter(sortBy, sortDirection, sorter), data);
};

export default runSorter;
