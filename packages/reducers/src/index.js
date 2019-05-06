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

import slice from './reducers/slice.reducer';
import call from './reducers/call.reducer';
import copy from './reducers/copy.reducer';
import toggle from './reducers/toggle.reducer';
import initialize from './reducers/initialize.reducer';
import reset from './reducers/reset.reducer';
import reduce from './reducers/reduce.reducer';
import extract from './reducers/extract.reducer';

import createAction from './create.action';

export {
  slice,
  call,
  copy,
  toggle,
  reset,
  extract,
  initialize,
  reduce,
  createAction
};
