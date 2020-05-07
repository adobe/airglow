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
import { renderAirglow } from '@airglow/test-utils';
import ReactStore, { connect } from '@airglow/store-react';
import prefab from '@airglow/prefab';

import plugin from '../../src/index';

let tree;

const prefabs = prefab({ color: { type: 'value' } });

const mapState = state => ({ color: prefabs.color.value(state) });

const mapHandlers = dispatch => ({
  onColor: v => dispatch(prefabs.color.changeAction(v))
});

const TestComponent = ({ color, onColor }) => (
  <input value={color || ''} onChange={e => onColor(e.target.value)} />
);

const TestConnected = connect(mapState, mapHandlers)(TestComponent);
const configuredPlugin = plugin();


describe('AirglowPrefabIntegrationTest', () => {
  beforeEach(() => {
    tree = renderAirglow(
      <TestConnected />,
      {
        store: ReactStore,
        plugins: [configuredPlugin],
        bootstrap: { prefab: prefabs }
      }
    );
  });
  afterEach(() => {
  });

  it('should render with default values', function () {
    expect(tree.debug()).toMatchSnapshot();
  });

  it('should call the reducer when the text changes', function (done) {
    tree.find('input').simulate('change', { target: { value: 'Purple!' } });

    setTimeout(() => {
      expect(tree.debug()).toMatchSnapshot();
      done();
    }, 30);
  });
});
