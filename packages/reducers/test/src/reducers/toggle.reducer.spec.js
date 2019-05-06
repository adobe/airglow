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

import { toggle } from '../../../src/index';

let reducer;

describe('ToggleReducer', () => {
  beforeEach(() => {
    reducer = toggle('hungry');
  });
  it('should set a value if it didnt exist', function () {
    expect(reducer({ }, { type: 'toggle' }).hungry).toBe(true);
  });
  it('should toggle a value', function () {
    expect(reducer({ hungry: true }, { type: 'toggle' }).hungry).toBe(false);
  });
  it('should not mutate input', function () {
    const a = { hungry: true };
    reducer(a, { type: 'toggle' });
    expect(a.hungry).toBe(true);
  });
});
