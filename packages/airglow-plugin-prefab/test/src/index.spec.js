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

import { REDUCER, BOOTSTRAP_MODULE } from 'airglow';
import { reducer } from '@airglow/prefab';
import * as wrinkle from '@airglow/reducers';
import plugin from '../../src/index';

let engine;
let slice;
let dispatch;
const getCall = (type) => {
  for (let i = 0; i < engine.plugin.callCount; ++i) {
    if (engine.plugin.getCall(i).args[0] === type) {
      return engine.plugin.getCall(i).args[1];
    }
  }
  return null;
};

describe('AirglowPrefabPlugin', () => {
  beforeEach(() => {
    engine = { plugin: sinon.spy() };
    slice = { with: sinon.stub().returns('SLICED!') };
    sinon.stub(wrinkle, 'slice').returns(slice);
    dispatch = sinon.spy();

    plugin({ storeKey: 'myprefab' })(engine);
  });
  afterEach(() => {
    wrinkle.slice.restore();
  });

  it('should register reducers', function () {
    expect(getCall(REDUCER)).toBe('SLICED!');
    expect(slice.with.firstCall.args[0]).toBe(reducer);
  });

  it('should send the prefab content on bootstrap', function () {
    plugin()(engine);
    const bootstrap = getCall(BOOTSTRAP_MODULE);
    bootstrap({ dispatch, prefab: 'new.prefab.content' });
    expect(dispatch.lastCall.args).toMatchSnapshot();
  });

  it('doesnt bootstrap if null prefab', function () {
    plugin()(engine);
    const bootstrap = getCall(BOOTSTRAP_MODULE);
    bootstrap({ dispatch });
    expect(dispatch.callCount).toBe(0);
  });
});
