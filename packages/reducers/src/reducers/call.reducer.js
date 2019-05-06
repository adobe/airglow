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

/*
  call is a reducer that simply calls one or more reducers when invoked.

  Usage:
  // call a bunch of reducers
  call(sizeReducer, stateReducer)

  // call for a spectific action
  call(sizeReducer).for('applySize')

  // call only when specific conditions are met
  call(sizeReducer).when((state, action) => state.mode === 'map')
*/

import { pipe, assoc, curry, all, when, not, prop, or } from 'ramda';

import executeReducers from '../util/execute.reducers';
import addProp from '../util/add.function.prop';

const validateFors = ({ fors }, { type }) =>
  !fors || fors.indexOf(type) >= 0;

const runValidator = curry((state, action, validator) =>
  validator(state, action));
const validateWhens = ({ whens }, state, action) =>
  !whens || all(runValidator(state, action), whens);

const shouldRunReducer = curry(
  (config, action, state) =>
    validateFors(config, action)
    && validateWhens(config, state, action)
);

const executeReducersIfValid = curry(
  (config, state, action, passThrough = {}) =>
    when(
      shouldRunReducer(config, action),
      () => executeReducers(config.reducers)(or(state, {}), action, { ...passThrough, ...config }),
      state
    )
);

const addConfigFunc = curry((funcName, configKey, applyTo) =>
  addProp(
    funcName,
    // rebuilds the return function using the original config plus
    // the new values provided as config[funcName]
    (...args) => callFromConfig(
      assoc(configKey, args, applyTo.config)
    ),
    applyTo
  ));

export const addConfigFuncIfNotUsed = curry((funcName, configKey, applyTo) => (
  when(
    () => not(prop(configKey, applyTo.config)),
    addConfigFunc(funcName, configKey),
    applyTo
  )
));

const addForFunction = addConfigFuncIfNotUsed('for', 'fors');
const addWhenFunction = addConfigFuncIfNotUsed('when', 'whens');
const addCurrentConfig = curry(
  (config, applyTo) => addProp('config', config, applyTo)
);

export const callFromConfig = config =>
  pipe(
    executeReducersIfValid(config),
    addCurrentConfig(config),
    addForFunction,
    addWhenFunction
  )();

export default (...reducers) =>
  callFromConfig({ reducers });
