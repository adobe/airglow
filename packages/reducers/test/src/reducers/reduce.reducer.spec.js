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

import { reduce } from '../../../src/index';

let reducer;
const state = {
  pizza: 'cheese'
};
const action = {
  payload: 'sausage'
};

describe('ReduceReducer', () => {
  it('should set to the payload by default', function () {
    reducer = reduce('pizza');
    expect(reducer(state, action).pizza).toBe('sausage');
  });
  it('should set to the to if provided', function () {
    reducer = reduce('pizza').to('pepperoni');
    expect(reducer(state, action).pizza).toBe('pepperoni');
  });
  it('should accept a null to value', function () {
    reducer = reduce('pizza').to(null);
    expect(reducer(state, action).pizza).toBe(null);
  });
  it('should not mutate input', function () {
    reducer = reduce('pizza');
    reducer(state, action);
    expect(state.pizza).toBe('cheese');
  });
});
