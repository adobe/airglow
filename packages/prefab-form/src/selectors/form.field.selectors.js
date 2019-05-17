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

import { change, blur, focus, submitField, reset } from '../actions';
import selectCurrentValue from './select.current.value';
import selectInvalidValue from './select.invalid.value';
import selectShouldValidate from './select.should.validate';
import selectDirty from './select.dirty';
import customBundleItems from '../custom/custom.bundle.items';
import { getRequired } from './select.store.paths';

const selectError = name => state => (
  selectShouldValidate(name, state) ? selectInvalidValue(name, state) : false
);

const makeState = name => state => ({
  value: selectCurrentValue(name, state),
  invalidMsg: selectInvalidValue(name, state),
  error: selectError(name)(state),
  required: getRequired(name)(state),
  dirty: selectDirty(name, state),
  ...customBundleItems(name, state)
});

const makeHandlers = name => dispatch => ({
  onChange: v => dispatch(change(name, v)),
  onFocus: () => dispatch(focus(name)),
  onBlur: () => dispatch(blur(name)),
  onSubmit: () => dispatch(submitField(name)),
  onReset: () => dispatch(reset(name))
});

export default name => ({
  value: selectCurrentValue(name),
  error: selectError(name),
  isInvalid: selectInvalidValue(name),
  isDirty: selectDirty(name),
  changeAction: v => change(name, v),
  submitAction: () => submitField(name),
  resetAction: () => reset(name),
  state: makeState(name),
  handlers: makeHandlers(name)
});
