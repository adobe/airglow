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

import { slice } from '../../../src/index';

let reducer;
let instance;

describe('SliceReducer', () => {
  beforeEach(() => {
    reducer = sinon.stub().returns('pepperoni');
    instance = slice('pizza').with(reducer);
  });
  it('should pass in the correct piece of state', function () {
    instance({ pizza: 'cheese' }, { type: 'changePizza' });
    expect(reducer.lastCall.args[0]).toBe('cheese');
  });
  it('should provide the reducer with the action', function () {
    instance({ pizza: 'cheese' }, { type: 'changePizza' });
    expect(reducer.lastCall.args[1].type).toBe('changePizza');
  });
  it('should pass the original state in as well', () => {
    instance({ pizza: 'cheese' }, { type: 'changePizza' });
    expect(reducer.lastCall.args[2]).toMatchSnapshot();
  });
  it('should set the correct piece of state', function () {
    const results = instance({ pizza: 'cheese' }, { type: 'changePizza' });
    expect(results).toMatchSnapshot();
  });
  it('should not fail if reducers arent provided', function () {
    instance = slice('pizza');
    instance({ pizza: 'cheese' }, { type: 'changePizza' });
  });
  it('should not change the inbound state', function () {
    const state = { pizza: 'cheese' };
    instance(state, { type: 'changePizza' });
    expect(state).toMatchSnapshot();
  });
});
