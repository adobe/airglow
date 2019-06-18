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

import { takeLatest, put, call, select } from 'redux-saga/effects';
import { SUBMIT } from '@airglow/prefab-form';

export function* runValidations({ payload }) {
  const state = yield select();
  const { construct } = payload;
  const form = state.prefab[construct].construct;

  if (form.isInvalid(state)) {
    const actions = extractActions('invalidAction', form);
    for (let i = 0; i < actions.length; ++i) {
      yield put(actions[i](construct));
    }
    return;
  }

  const extractedSuccessActions = [
    ...extractActions('successAction', form)
  ];
  const successActions = form.resetOnSuccess !== false
    ? [...form.resetActions, ...extractedSuccessActions] : extractedSuccessActions;
  const errorActions = extractActions('errorAction', form);
  const formData = { formName: construct, successActions, errorActions };
  const values = form.export(state);

  const submitActions = extractActions('validAction', form);
  for (let i = 0; i < submitActions.length; ++i) {
    yield put(submitActions[i](formData, values));
  }

  if (form.submitSaga) {
    yield call(form.submitSaga, { values, form: formData });
  }
}

export default function* validateSaga() {
  yield takeLatest(SUBMIT, runValidations);
}

const extractActions = (name, form) => {
  const actions = [...(form[`${name}s`] || [])];
  if (form[`${name}`]) { actions.push(form[`${name}`]); }
  return actions;
};
