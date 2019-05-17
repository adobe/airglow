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


import selector from '../../../src/selectors/select.invalid.value';

const makeState = value => ({
  prefab: {
    size: {
      store: { value },
      construct: {
        required: true,
        fieldType: 'number',
        max: 100,
        prevalidate: (n, state) =>
          (n ? state.formula(n) : n),
        validator: (n, { times }) =>
          (n === times ? 'error.nines' : null)
      }
    }
  },
  formula: a => a * a,
  times: 9
});

describe('SelectInvalidValue', () => {
  it('is false when valid', () => {
    expect(selector('size', makeState(1))).toBe(false);
  });
  it('uses the prevalidate function', () => {
    expect(selector('size', makeState(11))).toBe('error.number.max');
  });
  it('uses the provided validator', () => {
    expect(selector('size', makeState(3))).toBe('error.nines');
  });
  it('validates required values', () => {
    expect(selector('size', makeState())).toBe('error.required');
  });
});
