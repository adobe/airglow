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

import { forEachObjIndexed, assocPath, pathOr } from 'ramda';
import { selector } from '../../src/index';

export const INCREMENT = 'Increment';

const incrementDispatcher = (construct, dispatch) =>
  value => dispatch({
    type: INCREMENT,
    payload: { construct: construct.name, value }
  });

const countReducer = (state, { type, payload }) => {
  if (type !== INCREMENT) { return state; }
  const path = ['store', 'count'];
  const count = pathOr(0, path, state);

  return assocPath(path, count + payload.value, state);
};

const countSelector = ({
  options = {}, state, dispatch
}) => ({
  onIncrement: incrementDispatcher(state.construct, dispatch),
  value: valueCal(state.store.count, options.multiple, state.construct.default)
});

const valueCal = (current = 0, multiple = 1, defaultValue = 0) =>
  (current * multiple) + defaultValue;


export default ({ name, ...options }) => {
  const selectorInternal = selector(countSelector, name);
  forEachObjIndexed((v, k) => {
    selectorInternal[k] = v;
  }, options);
  selectorInternal.reduce = countReducer;
  return selectorInternal;
};
