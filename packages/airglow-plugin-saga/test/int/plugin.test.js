/*
 * ************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *   Copyright 2017 Adobe Systems Incorporated
 *   All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by all applicable intellectual property
 * laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ************************************************************************
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
