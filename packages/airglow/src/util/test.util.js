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
import Airglow from '../airglow';

export const renderAirglow = (children, props) => {
  let airglow;
  const App = () => {
    airglow = (
      <Airglow {...props}>
        {children}
      </Airglow>
    );
    return airglow;
  };

  const tree = mount(<App />);
  tree.airglow = tree;
  tree.store = tree.find('Airglow').instance().engine.getStore();
  if (tree.store) {
    tree.dispatch = tree.store.dispatch;
    tree.getState = tree.store.getState;
  }
  return tree;
};

class FakeStore {
  constructor() {
    this.bootstrap = sinon.spy();
  }

  create(...args) {
    this.createArgs = args;
    this.store = {
      dispatch: sinon.spy(),
      getState: sinon.spy(),
      injectReducers: sinon.spy()
    };
    return this.store;
  }
}

export const fakeStore = () => new FakeStore();
