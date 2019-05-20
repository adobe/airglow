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
import { createSelector } from 'reselect';
import { submit } from '../actions';

const getResetActions = (fields, { name, resetAction, resetActions = [] }) => {
  const actions = [...resetActions];
  if (resetAction) { actions.push(resetAction); }

  R.forEachObjIndexed(
    field => actions.push(field.resetAction),
    fields
  );
  return R.map(
    action => action(name),
    actions
  );
};

const onResetHandler = (fields, config) =>
  dispatch => () => {
    R.forEach(
      dispatch,
      getResetActions(fields, config)
    );
  };

const onSubmitHandler = (fields, { name, submitAction, submitActions = [] }) =>
  dispatch => (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    dispatch(submit(name));

    if (submitAction) { dispatch(submitAction(name)); }
    R.forEach(action => dispatch(action(name)), submitActions);

    R.forEachObjIndexed(
      field => dispatch(field.submitAction(name)),
      fields
    );
  };

const makeExport = (fields, { localKeys = [] }) => (state) => {
  const reduced = {};
  R.forEachObjIndexed(
    (field) => {
      const value = field.value(state);
      if (localKeys.indexOf(field.externalName) && value !== undefined) {
        reduced[field.externalName] = value;
      }
    },
    fields
  );
  return reduced;
};

const makeState = fields => createSelector(
  R.map(field => field.state, Object.values(fields)),
  (...args) => {
    const results = {};
    for (let i = 0; i < args.length; ++i) {
      results[Object.keys(fields)[i]] = args[i];
    }
    return results;
  }
);

const makeHandlers = (fields, config) => createSelector(
  [d => d],
  dispatch => ({
    onReset: onResetHandler(fields, config)(dispatch),
    onSubmit: onSubmitHandler(fields, config)(dispatch),
    ...R.mapObjIndexed(field => field.handlers(dispatch), fields)
  })
);

const checkInvalid = fields => state =>
  R.find(
    R.identity,
    R.map(
      (field) => {
        const invalid = field.isInvalid(state);
        return invalid && { field: field.externalName, error: invalid };
      },
      Object.values(fields)
    )
  ) || false;

const checkDirty = fields => state =>
  !!R.find(
    field => field.isDirty(state),
    Object.values(fields)
  );

export default ({
  fields,
  ...config
}) => ({
  state: makeState(fields),
  export: makeExport(fields, config),
  handlers: makeHandlers(fields, config),
  isInvalid: checkInvalid(fields),
  isDirty: checkDirty(fields),
  resetActions: getResetActions(fields, config),
  fields
});
