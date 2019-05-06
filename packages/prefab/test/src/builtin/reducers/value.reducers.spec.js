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

import { valueReducer, resetReducer } from '../../../../src/builtin/reducers/value.reducers';

const emptyState = {
  store: {
  }
};

const filledState = {
  store: {
    value: 'crispy'
  }
};

const payload = { payload: {
  construct: 'pickleToggle'
} };

describe('valueReducers', () => {
  it('update the value', function () {
    expect(valueReducer(emptyState, { payload: {
      value: 'soggy'
    } })).toMatchSnapshot();
  });
  it('should reset values properly', function () {
    expect(resetReducer(filledState, { payload }))
      .toMatchSnapshot();
  });
  it('should reset values properly with defaultValue', function () {
    expect(resetReducer({ construct: { name: 'pickleToggle', defaultValue: 'crunchy' }, ...filledState }))
      .toMatchSnapshot();
  });
});
