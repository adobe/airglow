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
import Airglow, { ENHANCER } from 'airglow';
import ReduxStore, { connect } from '../../src';

const testEnhancer = createStore => (...args) => {
  const store = createStore(...args);
  return { ...store, getState: () => ({ enhanced: true }) };
};

const plugin = (engine) => {
  engine.plugin(ENHANCER, testEnhancer);
};

let tree;
const TestComponent = ({ enhanced }) => (
  <div>Enhanced? {enhanced ? 'yes' : 'no'}</div>
);

const TestConnected = connect(state => (
  { enhanced: state.enhanced }
))(TestComponent);

describe('StoreEnhancerIntegrationTest', () => {
  beforeEach(() => {
    tree = mount(
      <Airglow store={ReduxStore} plugins={[plugin]}>
        <TestConnected />
      </Airglow>
    );
  });
  it('should enhance when creating the store', () => {
    expect(tree.contains(
      <div>Enhanced? yes</div>
    )).toBe(true);
  });
});
