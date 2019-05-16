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

//
// Given a provided state, see if any existing umbra form is currently dirty
//

import * as R from 'ramda';

const isUmbraForm = R.pathEq(['construct', 'type'], 'form');

const isFormDirty = state => form => form.construct.isDirty(state);
const pullFormsFromState = R.pipe(
  R.prop('prefab'),
  R.filter(isUmbraForm),
  R.values
);

export default (state) => {
  const forms = pullFormsFromState(state);
  const dirty = R.filter(isFormDirty(state), forms);
  return dirty.length ? dirty : false;
};
