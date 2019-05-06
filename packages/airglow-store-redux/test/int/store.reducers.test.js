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
import { connect } from 'react-redux';
import { mount } from 'enzyme';

import Airglow, { REDUCER } from 'airglow';
import ReduxStore from '../../src';


const ac = () => ({ type: 'TOGGLE' });
const reducer = (state, event) => {
  if (event.type === '@@redux/INIT') {
    return {
      ...state, toggled: false
    };
  }
  if (event.type === 'TOGGLE') {
    return {
      ...state, toggled: !state.toggled
    };
  }
  return state;
};

const plugin = (engine) => {
  engine.plugin(REDUCER, reducer);
};

let tree;
let button;
const TestComponent = ({ toggled, onClick }) => (
  <button
    type="button"
    onClick={() => onClick()}
  >
    Toggle: {toggled ? 'yes' : 'no'}
  </button>
);

const TestConnected = connect(
  state => ({ toggled: state.toggled }),
  dispatch => ({ onClick: () => dispatch(ac()) })
)(TestComponent);

describe('StoreReducerIntegrationTest', () => {
  beforeEach(() => {
    tree = mount(
      <Airglow store={ReduxStore} plugins={[plugin]}>
        <TestConnected />
      </Airglow>
    );
  });
  it('should render the initial state', () => {
    expect(tree.text()).toBe('Toggle: no');
  });
  it('should toggle on button click', () => {
    tree.find('button').simulate('click');
    expect(tree.text()).toBe('Toggle: yes');
  });
});
