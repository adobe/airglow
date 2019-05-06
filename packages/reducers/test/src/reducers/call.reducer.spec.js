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

import { assoc } from 'ramda';
import { call } from '../../../src/index';

let reducer;
let reducerB;
const args = [
  { pizza: 'sausage' },
  { type: 'changePizza' },
  { fullState: { food: { pizza: 'sausage' } } }
];

let goodVal;
let badVal;

describe('CallReducer', () => {
  beforeEach(() => {
    reducer = sinon.stub().callsFake(assoc('pizza', 'cheese'));
    reducerB = sinon.stub().callsFake(assoc('iceCream', 'rocky road'));

    goodVal = sinon.stub().returns(true);
    badVal = sinon.stub().returns(false);
  });
  it('should return the results of the provided function', function () {
    expect(call(reducer)(...args)).toMatchSnapshot();
  });
  it('should provide the reducer with the state and action', function () {
    call(reducer)(...args);
    expect(reducer.firstCall.args).toMatchSnapshot();
  });
  it('should support multiple reducers', function () {
    call(reducer, reducerB)(...args);
    expect(call(reducer, reducerB)(...args)).toMatchSnapshot();
  });
  it('should call if the for is a match', function () {
    const myCall = call(reducer).for('changePizza');
    myCall(...args);
    expect(reducer.callCount).toBe(1);
  });
  it('should not call if the for is not match', function () {
    const myCall = call(reducer).for('changePizza');
    myCall({ pizza: 'sausage' }, { type: 'addTopping' });
    expect(reducer.callCount).toBe(0);
  });
  it('should handle multiple fors', function () {
    const myCall = call(reducer).for('changePizza', 'addTopping');
    myCall({ pizza: 'sausage' }, { type: 'addTopping' });
    expect(reducer.callCount).toBe(1);
  });
  it('should fail if a validator fails', function () {
    const myCall = call(reducer).when(goodVal, badVal);
    myCall(...args);
    expect(reducer.callCount).toBe(0);
  });
  it('should succeed if all validators work', function () {
    const myCall = call(reducer).when(goodVal);
    myCall(...args);
    expect(reducer.callCount).toBe(1);
  });
  it('should pass the state and action to the validators', function () {
    const myCall = call(reducer).when(goodVal);
    myCall(...args);
    expect(goodVal.firstCall.args).toMatchSnapshot();
  });
  it('should provide the config for others to use', function () {
    const myCall = call(reducer).for('changePizza');
    expect(myCall.config).toMatchSnapshot();
  });
});
