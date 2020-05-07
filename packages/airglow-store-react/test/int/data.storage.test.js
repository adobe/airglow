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
import { call, initialize, slice, reduce } from '@airglow/reducers';
import { renderAirglow } from '@airglow/test-utils';
import ReactStore, { connect } from '../../src';

let tree;
const TestComponent = ({ value, onChange }) => (
  <input type="text" value={value || ''} onChange={onChange} />
);
const TestConnected = connect(
  state => ({
    value: state.data && state.data.name,
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
    initialize({ name: 'Jimmy' }, call(
      reduce('name').for('updateName')
    ))
  )]
};

describe('Redux BootstrapIntegrationTest', () => {
  beforeEach(() => {
    tree = renderAirglow(
      <TestConnected data={{ name: 'props', value: 'six', details: 'meta' }} />,
      {
        store: ReactStore,
        plugins: [],
        bootstrap: bootstrapConfig
      }
    );
  });
  it('uses the value for the text field', () => {
    expect(tree.find('input').prop('value')).toBe('Jimmy');
  });
  it('responds to dispatched events', () => {
    tree.find('input').simulate('change', { target: { value: 'Dave' } });
    expect(tree.find('input').prop('value')).toBe('Dave');
  });
  it('cleans up on unmount', () => {
    tree.unmount();
    const subs = tree.store.subscriptions;
    expect(tree.store.subscriptions[Object.keys(subs)[0]]).toBe(null);
  });
  it('merges nested props', () => {
    expect(tree.find('TestComponent').prop('data')).toMatchSnapshot();
  });
});
