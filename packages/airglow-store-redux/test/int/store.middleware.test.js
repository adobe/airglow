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
import Airglow, { MIDDLEWARE } from 'airglow';
import ReduxStore from '../../src';

let lastAction;
let tree;

const ac = () => ({ type: 'CLICK IT' });
const middleware = () => next => (action) => {
  lastAction = action;
  return next(action);
};
const plugin = (engine) => {
  engine.plugin(MIDDLEWARE, middleware);
};

let button;
const TestComponent = ({ onClick }) => (
  <button
    type="button"
    onClick={() => onClick()}
  >
    Click Me
  </button>
);

const TestConnected = connect(
  state => ({ toggled: state.toggled }),
  dispatch => ({ onClick: () => dispatch(ac()) })
)(TestComponent);

describe('StoreMiddlewareIntegrationTest', () => {
  beforeEach(() => {
    lastAction = null;
    tree = mount(
      <Airglow store={ReduxStore} plugins={[plugin]}>
        <TestConnected />
      </Airglow>
    );
  });
  it('should trigger middleware on all actions', () => {
    tree.find('button').simulate('click');
    expect(lastAction).toMatchSnapshot();
  });
  it('should not be triggered by default', () => {
    expect(lastAction).toBe(null);
  });
});
