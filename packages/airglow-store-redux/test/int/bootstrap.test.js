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
import { initialize, slice } from '@airglow/reducers';
import ReduxStore, { connect } from '../../src';
import { renderAirglow } from '../../../../test/util/test.utils';

let tree;
const TestComponent = ({ text }) => (
  <div>{text}</div>
);
const TestConnected = connect(
  state => ({
    text: state.data && state.data.bellHopper,
    data: { name: 'key', value: 'eleven' }
  }),
  dispatch => ({
    onChange: e => dispatch({ type: 'updateName', payload: e.target.value }),
    data: { value: 'thirteen' }
  })
)(TestComponent);

const bootstrapConfig = {
  name: 'bellHopper',
  reducers: [slice('data').with(
    initialize({ bellHopper: 'Jimmmy' }, state => state)
  )]
};

describe('Redux BootstrapIntegrationTest', () => {
  beforeEach(() => {
    tree = renderAirglow(
      <TestConnected data={{ name: 'props', value: 'six', details: 'meta' }} />,
      {
        store: ReduxStore,
        plugins: [],
        bootstrap: bootstrapConfig
      }
    );
  });
  it('should use the bootsrapped reducers', () => {
    expect(tree).not.toBe(null);
  });
  it('merges nested props', () => {
    expect(tree.find('TestComponent').prop('data')).toMatchSnapshot();
  });
});
