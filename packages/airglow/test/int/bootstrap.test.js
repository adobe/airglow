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
import Airglow, {
  BOOTSTRAP_MODULE, BOOTSTRAP_PLUGIN, AirglowWrapper
} from '../../src';
import { fakeStore } from '../../src/util/test.util';

let diamonds;
let tree;

const plugin = (engine) => {
  engine.plugin(BOOTSTRAP_PLUGIN, () => {
    diamonds = 17;
  });
  engine.plugin(BOOTSTRAP_MODULE, ({ diamond }) => {
    diamonds += diamond;
  });
};

const bootstrapConfig = {
  name: 'bellHopper',
  diamond: 13,
  mountActions: [{ type: 'test' }]
};

describe('Airglow BootstrapIntegrationTest', () => {
  beforeEach(() => {
    diamonds = 0;
    tree = mount(
      <Airglow
        store={fakeStore}
        plugins={[plugin]}
      >
        <AirglowWrapper
          config={bootstrapConfig}
        >
          <div>Test</div>
        </AirglowWrapper>
      </Airglow>
    );
  });
  it('should use the plugins bootstrap function', () => {
    expect(diamonds).toBe(30);
  });
  it('should dispatch any mount actions', () => {
    const store = tree.find('Airglow').instance().engine.getStore();
    expect(store.dispatch.getCall(0).args).toMatchSnapshot();
  });
});
