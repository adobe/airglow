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

import { bootstrap } from '../../src/reducers';

const payload1 = { payload: { pizza: { description: 'ABC' }, toppings: { description: 'EFG' } } };

describe('Bootstrap.Reducer', () => {
  it('should add the specified data to the prefab store', () => {
    expect(bootstrap({}, payload1)).toMatchSnapshot();
  });
  it('should merge with existing data', () => {
    const results = bootstrap({}, payload1);
    expect(
      bootstrap(results, { payload: { size: { description: 'LMN' } } })
    ).toMatchSnapshot();
  });
});
