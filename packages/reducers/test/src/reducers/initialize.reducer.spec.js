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

import { initialize } from '../../../src/index';

let reducer;
let callback;

describe('InitializeReducer', () => {
  beforeEach(() => {
    callback = sinon.spy();
    reducer = initialize({ pizza: 'pepperoni' }, callback);
  });
  it('passes the initialized values if no state', function () {
    reducer(null, { type: 'test' });
    expect(callback.lastCall.args).toMatchSnapshot();
  });
  it('passes the state if it exists', function () {
    reducer({ pizza: 'sausage' }, { type: 'test' });
    expect(callback.lastCall.args).toMatchSnapshot();
  });
});
