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

import selector from '../../../src/selectors/select.current.value';

const fullConstruct = { sourceSelector: () => 'hawaiian', defaultValue: 'cheese' };
const defaultConstruct = { defaultValue: 'cheese' };

describe('SelectCurrentValue', () => {
  it('should return the store value if provided', () => {
    const state = { prefab: { pizza: {
      construct: fullConstruct,
      store: { value: 'meats' }
    } } };
    expect(selector('pizza', state)).toBe('meats');
  });
  it('should pull the data from the source data if provided', () => {
    const state = { prefab: { pizza: {
      construct: fullConstruct
    } } };
    expect(selector('pizza', state)).toBe('hawaiian');
  });
  it('should use the defaultValue by default', () => {
    const state = { prefab: { pizza: {
      construct: defaultConstruct
    } } };
    expect(selector('pizza', state)).toBe('cheese');
  });
});
