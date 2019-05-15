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
import ReduxStore, { connect } from '@airglow/store-redux';
import { renderAirglow } from 'airglow';
import { takeEvery } from 'redux-saga/effects';
import plugin, { SAGA } from '../../src/index';

const FETCH = 'FETCH_REQUEST';
const ac = () => ({ type: FETCH });

let sagaCalled;
const TestComponent = ({ onClick }) => (
  <button
    type="button"
    onClick={() => onClick()}
  >
    Test
  </button>
);

const TestConnected = connect(
  () => ({}),
  dispatch => ({ onClick: () => dispatch(ac()) })
)(TestComponent);

function* mySaga() {
  yield takeEvery(FETCH, doFetch);
}

const doFetch = () => {
  sagaCalled = true;
};
let tree;

const sagaPlugin = (engine) => {
  engine.plugin(SAGA, mySaga);
};

describe('SagaPluginIntegrationTest', () => {
  beforeEach(() => {
    sagaCalled = false;
    tree = renderAirglow(
      <TestConnected />,
      {
        store: ReduxStore,
        plugins: [sagaPlugin, plugin()]
      }
    );
  });
  afterEach(() => {
  });

  it('should call the saga on button click', function (done) {
    tree.find('button').simulate('click');
    setTimeout(() => {
      expect(sagaCalled).toBe(true);
      done();
    }, 30);
  });
});
