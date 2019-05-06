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

import { POST_ENHANCER, COMPONENT, COMPOSER } from 'airglow';
import sinon from 'sinon';
import * as devtools from '../../src/devtools';
import plugin from '../../src/index';

let engine;

const getCall = (type) => {
  for (let i = 0; i < engine.plugin.callCount; ++i) {
    if (engine.plugin.getCall(i).args[0] === type) {
      return engine.plugin.getCall(i).args[1];
    }
  }
  return null;
};

describe('airglowSagaPlugin', () => {
  beforeEach(() => {
    engine = {
      plugin: sinon.spy()
    };
    sinon.stub(devtools, 'default');
    sinon.stub(devtools.default, 'instrument').returns('INSTRUMENTED!');
  });
  afterEach(() => {
    devtools.default.restore();
  });

  describe('redudDevtools', () => {
    beforeEach(() => {
      plugin({ reduxDevtools: true })(engine);
    });
    it('should add the enhancer', function () {
      expect(getCall(POST_ENHANCER)).toBe('INSTRUMENTED!');
    });
    it('should add the component', function () {
      expect(getCall(COMPONENT)).not.toBeUndefined();
    });
  });

  /* eslint-disable no-underscore-dangle */
  describe('reduxBrowser', () => {
    beforeEach(() => {
      plugin({ reduxBrowser: true })(engine);
    });
    it('should add a composer', function () {
      expect(getCall(COMPOSER)).not.toBeUndefined();
    });
    it('should use the extensions compose if possible', function () {
      const composer = sinon.spy();
      const composer2 = sinon.spy();
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => composer2;
      expect(engine.plugin.getCall(0).args[1](composer)).toBe(composer2);
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = '';
    });
    it('should return the specified composer if no on window', function () {
      const composer = sinon.spy();
      expect(engine.plugin.getCall(0).args[1](composer)).toBe(composer);
    });
  });
});
