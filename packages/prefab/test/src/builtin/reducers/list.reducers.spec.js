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

import {
  listReducer,
  addToListReducer,
  removeFromListReducer,
  removeAtIndexReducer
} from '../../../../src/builtin/reducers/list.reducers';

const emptyState = { store: { } };
const defaultState = { construct: { defaultValue: ['red', 'black'] } };
const filledState = { store: { value: ['yellow', 'green'] } };

describe('listReducers', () => {
  it('sets the value', function () {
    expect(listReducer(emptyState, { payload: {
      value: ['white']
    } })).toMatchSnapshot();
  });
  it('adds a value', () => {
    expect(addToListReducer(filledState, { payload: {
      value: 'white'
    } })).toMatchSnapshot();
  });
  it('adds a value to the default', () => {
    expect(addToListReducer(defaultState, { payload: {
      value: 'white'
    } })).toMatchSnapshot();
  });
  it('removes a value', () => {
    expect(removeFromListReducer(filledState, { payload: {
      value: 'green'
    } })).toMatchSnapshot();
  });
  it('removes a value from the default', () => {
    expect(removeFromListReducer(defaultState, { payload: {
      value: 'red'
    } })).toMatchSnapshot();
  });
  it('removes a value at the proper index', () => {
    const state = addToListReducer(filledState, { payload: {
      value: 'white'
    } });
    expect(removeAtIndexReducer(state, { payload: {
      value: 1,
      size: 2
    } })).toMatchSnapshot();
  });
});
