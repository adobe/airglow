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

import generate, { registerProvider } from '../../src/generate';

const doublePrefab = ({ name }) => {
  const selectorInternal = () => {};
  selectorInternal.reduce = s => s;
  return {
    [`${name}A`]: selectorInternal,
    [`${name}B`]: selectorInternal
  };
};

describe('generate prefab', () => {
  it('should process provided configuration', () => {
    expect(generate({
      isOpen: { type: 'toggle' },
      value: { type: 'value', defaultValue: 'test' }
    })).toMatchSnapshot();
  });
  it('handles multiple results from a construct', () => {
    registerProvider('double', doublePrefab);
    expect(generate({
      name: { type: 'double' },
      value: { type: 'double' }
    })).toMatchSnapshot();
  });
});
