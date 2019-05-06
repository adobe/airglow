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

import * as R from 'ramda';
import { FEATURE, BOOTSTRAP_MODULE, BOOTSTRAP_PLUGIN } from './types';

let PLUGIN_INDEX = 0;

class Engine {
  constructor(storeFactory, plugins = []) {
    this.registery = {};
    this.bootstrapped = {};
    plugins.forEach(plugin => plugin(this));
    if (storeFactory) {
      this.store = this.generateStore(storeFactory);
    }
    this.enableFeatures();
    this.bootstrapPlugins();
  }

  plugin(type, callback) {
    this.registery[type] = (this.registery[type] || []).concat({
      type,
      callback,
      index: ++PLUGIN_INDEX
    });
  }

  getPlugins(type) {
    return R.map(R.prop('callback'), this.registery[type] || []);
  }

  getPluginsData(plugin) {
    return this.registery[plugin];
  }

  generateStore(storeFactory) {
    const store = storeFactory.create(type => this.getPlugins(type));
    storeFactory.bootstrap(this);
    return store;
  }

  getStore() {
    return this.store;
  }

  enableFeatures() {
    this.getPlugins(FEATURE).forEach(feature =>
      feature(type => this.getPlugins(type)));
  }

  bootstrapPlugins() {
    this.getPlugins(BOOTSTRAP_PLUGIN).forEach(
      bootstrapper => bootstrapper({ dispatch: this.store ? this.store.dispatch : null })
    );
  }

  bootstrapModule({ name, reducers, ...options }) {
    if (this.bootstrapped[name]) { return; }
    if (this.store) {
      this.store.injectReducers(reducers);
    }

    const fullOptions = {
      dispatch: this.store ? this.store.dispatch : null,
      ...options
    };

    this.getPlugins(BOOTSTRAP_MODULE).forEach(
      bootstrapper => bootstrapper(fullOptions)
    );
    this.bootstrapped[name] = true;
  }
}

export default Engine;
