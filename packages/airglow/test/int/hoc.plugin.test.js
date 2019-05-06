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

import { HOC } from '../../src/types';
import Airglow from '../../src/airglow';

const component = props => <div className="sugar" {...props} />;

const plugin = (engine) => {
  engine.plugin(HOC, { component });
};

let tree;

describe('HocPluginIntegrationTest', () => {
  beforeEach(function () {
    tree = mount(
      <Airglow plugins={[plugin]}>
        <div>Here is my content!</div>
      </Airglow>
    );
  });
  it('should render the plugins component', function () {
    expect(tree.contains(
      <div className="sugar">
        <div>Here is my content!</div>
      </div>
    )).toBe(true);
  });
});
