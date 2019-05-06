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

import sinon from 'sinon';
import Engine from '../../src/engine';
import { FEATURE, BOOTSTRAP_MODULE, BOOTSTRAP_PLUGIN } from '../../src/types';
import { fakeStore } from '../../src/util/test.util';

let ranFeature;
const reducerPlugin1 = (engine) => {
  engine.plugin('reducer', () => 'rp1');
};
const reducerPlugin2 = (engine) => {
  engine.plugin('reducer', () => 'rp2A');
  engine.plugin('reducer', () => 'rp2B');
};
const customPlugin1 = (engine) => {
  engine.plugin('custom', () => 'custom1');
};
const customPlugin2 = (engine) => {
  engine.plugin('custom', () => 'custom2');
  engine.plugin('template', () => 'custom2');
};
const featurePlugin = (engine) => {
  engine.plugin(FEATURE, (lookup) => {
    ranFeature = lookup('reducer').map(plugin => plugin());
  });
};

let myStore;
const spawn = (...a) => new Engine(myStore, ...a);

describe('Airglow Engine', () => {
  beforeEach(() => {
    myStore = fakeStore();
  });
  afterEach(() => {
    ranFeature = null;
  });
  it('creates the store', () => {
    expect(spawn().getStore()).toBe(myStore.store);
  });
  it('bootstraps the store', () => {
    spawn();
    expect(myStore.bootstrap.called).toBe(true);
  });
  it('should create an engine', function () {
    // empty registery
    expect(spawn()).toMatchSnapshot();
  });
  it('should initialize all the plugins', function () {
    // registry with custom entries
    // empty store
    const engine = spawn([customPlugin1, customPlugin2]);
    expect(engine).toMatchSnapshot();
  });

  it('should be able to get plugins of a specified type', function () {
    // 2 items
    const engine = spawn([customPlugin1, customPlugin2]);
    expect(
      engine.getPlugins('custom').map(plugin => plugin())
    ).toMatchSnapshot();
  });

  it('should return an empty array if no plugins', function () {
    // 2 items
    const engine = spawn([customPlugin1, customPlugin2]);
    expect(
      engine.getPlugins('zipper')
    ).toMatchSnapshot();
  });

  it('should pass getPlugins function to the store', function () {
    // 3 items
    spawn([reducerPlugin1, reducerPlugin2]);

    expect(
      myStore.createArgs[0]('reducer').map(plugin => plugin())
    ).toMatchSnapshot();
  });

  it('should execute each added feature', function () {
    spawn([reducerPlugin2, featurePlugin]);
    expect(ranFeature).toMatchSnapshot();
  });

  it('should run any bootstrap plugins', function () {
    const customSpy = sinon.spy();
    const bootstrapPlugin = (engineIn) => {
      engineIn.plugin(
        BOOTSTRAP_PLUGIN,
        ({ dispatch }) => dispatch(customSpy())
      );
    };
    spawn([bootstrapPlugin]);
    expect(customSpy.callCount).toBe(1);
  });

  describe('bootstrapModule', () => {
    const name = 'teststrap';
    let customSpy;
    let engine;

    beforeEach(() => {
      customSpy = sinon.spy();

      const bootstrapPlugin = (engineIn) => {
        engineIn.plugin(BOOTSTRAP_MODULE, customSpy);
      };
      engine = spawn([bootstrapPlugin]);
    });
    it('should inject reducers', function () {
      engine.bootstrapModule({ name, reducers: ['test'] });
      expect(myStore.store.injectReducers.calledWith(['test'])).toBe(true);
    });
    it('should not call if already called', function () {
      engine.bootstrapModule({ name, reducers: ['test'] });
      engine.bootstrapModule({ name, reducers: ['test'] });
      expect(myStore.store.injectReducers.callCount).toBe(1);
    });
    it('should run any bootstrap plugins', function () {
      engine.bootstrapModule({ name, reducers: ['test'], data: 29 });
      expect(customSpy.lastCall.args[0].data).toBe(29);
    });
    it('should pass in the stores dispatcher', function () {
      engine.bootstrapModule({ name, reducers: ['test'], data: 29 });
      expect(customSpy.lastCall.args[0].dispatch).toBe(myStore.store.dispatch);
    });
  });
});
