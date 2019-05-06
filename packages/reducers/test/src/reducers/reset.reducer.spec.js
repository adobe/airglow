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

import { reset } from '../../../src/index';
import { INITIALIZE_ROOT } from '../../../src/reducers/initialize.reducer';

let reducer;

const state = {
  [INITIALIZE_ROOT]: {
    pizza: 'pepperoni',
    iceCream: 'vanila',
    salad: 'caesar',
    drink: 'coke'
  },
  pizza: 'vegi',
  iceCream: 'rocky road',
  salad: 'chop',
  extra: true
};
const action = { type: 'test' };

describe('ResetReducer', () => {
  it('should reset individual items', function () {
    reducer = reset('pizza');
    expect(reducer(state, action)).toMatchSnapshot();
  });
  it('should reset multiple items', function () {
    reducer = reset('pizza', 'salad');
    expect(reducer(state, action)).toMatchSnapshot();
  });
  it('should reset to undefined if it wasnt initilized', function () {
    reducer = reset('extra');
    expect(reducer(state, action)).toMatchSnapshot();
  });
  it('should reset everything if not specific', function () {
    reducer = reset();
    expect(reducer(state, action)).toMatchSnapshot();
  });

  it('should not mutate input', function () {
    reducer = reset('pizza', 'salad');
    reducer(state, action);
    expect(state).toMatchSnapshot();
  });
});
