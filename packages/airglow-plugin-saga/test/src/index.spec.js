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

import { FEATURE, MIDDLEWARE, BOOTSTRAP_MODULE } from 'airglow';
import * as reduxSaga from 'redux-saga';
import plugin, { SAGA } from '../../src/index';

let engine;
let middleware;

const getCall = (type) => {
  for (let i = 0; i < engine.plugin.callCount; ++i) {
    if (engine.plugin.getCall(i).args[0] === type) {
      return engine.plugin.getCall(i).args[1];
    }
  }
  return null;
};

const lookup = (type) => {
  if (type === SAGA) {
    return [
      ['a', 'b', 'c'],
      ['x', 'y', 'z']
    ];
  }
  return [];
};

const toStrap = {
  sagas: ['x', 'y', 'z']
};

describe('coronaSagaPlugin', () => {
  beforeEach(() => {
    middleware = {
      run: sinon.spy()
    };
    engine = {
      plugin: sinon.spy()
    };
    sinon.stub(reduxSaga, 'default').returns(middleware);
  });
  afterEach(() => {
    reduxSaga.default.restore();
  });

  it('should add the saga middleware', function () {
    plugin()(engine);
    expect(getCall(MIDDLEWARE)).toBe(middleware);
  });
  it('should add the saga feature', function () {
    plugin()(engine);
    expect(getCall(FEATURE)).toBeDefined();
  });
  it('should add the saga bootstrap', function () {
    plugin()(engine);
    expect(getCall(BOOTSTRAP_MODULE)).toBeDefined();
  });

  it('should run the sagas for each plugin that used the saga feature', function () {
    plugin()(engine);
    const feature = getCall(FEATURE);
    feature(lookup);

    expect(middleware.run.callCount).toBe(2);
    expect(middleware.run.firstCall.args[0]).toEqual(['a', 'b', 'c']);
  });

  it('should run each bootstrapped sagas', function () {
    plugin()(engine);
    const bootstrap = getCall(BOOTSTRAP_MODULE);
    bootstrap(toStrap);

    expect(middleware.run.firstCall.args[0]).toEqual(['x', 'y', 'z']);
  });

  it('doesnt bootstrap if null sagas', function () {
    plugin()(engine);
    const bootstrap = getCall(BOOTSTRAP_MODULE);
    bootstrap({});

    expect(middleware.run.callCount).toBe(0);
  });
});
