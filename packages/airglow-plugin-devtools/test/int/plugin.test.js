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
import { renderAirglow } from 'airglow';
import ReduxStore from '@airglow/store-redux';
import plugin from '../../src/index';

let tree;
const TestComponent = () => (
  <div>Content</div>
);
describe('AirglowDevToolsIntegrationTest', () => {
  const spawn = (options) => {
    tree = renderAirglow(
      <TestComponent />,
      {
        store: ReduxStore,
        plugins: [plugin(options)]
      }
    );
  };

  it('should add nothing by default', function () {
    spawn();
    expect(tree.find('DevTools').length).toBe(0);
  });

  it('should add the devtool components', function () {
    spawn({ reduxDevtools: true });
    expect(tree.find('DevTools').length).toBe(1);
  });
});
