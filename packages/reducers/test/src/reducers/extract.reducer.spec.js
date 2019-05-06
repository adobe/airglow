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

import { extract } from '../../../src/index';

let reducer;

const state = {
  pizza: 'cheese',
  crust: 'thin'
};
const action = {
  payload: {
    crust: 'deep',
    size: 'large'
  }
};

describe('ExtractReducer', () => {
  it('should extract a value from the payload', function () {
    reducer = extract('crust');
    expect(reducer(state, action).crust).toBe('deep');
  });
  it('should extract multiple values', function () {
    reducer = extract('crust', 'size');
    expect(reducer(state, action)).toMatchSnapshot();
  });
  it('should not mutate input', function () {
    reducer = extract('crust');
    reducer(state, action);
    expect(state.crust).toBe('thin');
  });
});
