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

import React from 'react';
import { mount } from 'enzyme';

import { FEATURE } from '../../src/types';
import Airglow from '../../src/airglow';

const SUM = 'sum';
let sum;

const providerPlugin = (engine) => {
  engine.plugin(
    FEATURE, lookup =>
      lookup(SUM).forEach(plugin => plugin((a, b) => a + b))
  );
};

const userPlugin = (engine) => {
  engine.plugin(SUM, (runner) => {
    sum = runner(3, 2);
  });
};

describe('CustomPluginFeature', () => {
  beforeEach(function () {
    sum = 0;
  });
  it('should correctly provide new functionality', function () {
    mount(
      <Airglow plugins={[providerPlugin, userPlugin]}>Hello</Airglow>
    );
    expect(sum).toBe(5);
  });
  it('should work if the user comes before the plugin', function () {
    mount(
      <Airglow plugins={[userPlugin, providerPlugin]}>Hello</Airglow>
    );
    expect(sum).toBe(5);
  });
});
