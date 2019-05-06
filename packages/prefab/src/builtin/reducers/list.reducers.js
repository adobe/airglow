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

const valuePath = ['store', 'value'];

const selectValue = state =>
  R.defaultTo(
    R.path(['construct', 'defaultValue'], state),
    R.path(valuePath, state)
  );


const listReducer = (state, { payload }) => R.assocPath(
  valuePath,
  payload.value,
  state
);

const addToListReducer = (state, { payload }) => R.assocPath(
  valuePath,
  R.append(payload.value, selectValue(state)),
  state
);

const removeFromListReducer = (state, { payload }) => R.assocPath(
  valuePath,
  R.without([payload.value], selectValue(state)),
  state
);

const removeAtIndexReducer = (state, { payload }) => R.assocPath(
  valuePath,
  R.remove(payload.value, payload.size || 1, selectValue(state)),
  state
);

export { listReducer, addToListReducer, removeFromListReducer, removeAtIndexReducer };
