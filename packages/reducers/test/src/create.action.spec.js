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

import createAction from '../../src/create.action';

const type = 'MY_ACTION';

describe('addFunctionProp', () => {
  beforeEach(() => {

  });
  it('creates an action', function () {
    const action = createAction(type);
    expect(action()).toMatchSnapshot();
  });
  it('passes in properties', function () {
    const action = createAction(type);
    expect(action({ a: 'b' })).toMatchSnapshot();
  });
  it('uses a provided payload mapper', function () {
    const mapper = (a, b) => ({ a, b });
    const action = createAction(type, mapper);
    expect(action(7, 23)).toMatchSnapshot();
  });
  it('uses a provided metdata mapper', function () {
    const mapper = (a, b) => ({ a, b });
    const action = createAction(type, null, mapper);
    expect(action(7, 23)).toMatchSnapshot();
  });
});
