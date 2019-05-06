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

import { REDUCER, HOC } from 'airglow';
import { StoreProvider } from './store.context';

export { default as connect } from './connect';

let SUBSCRIBE_INDEX = 0;

class Store {
  constructor(reducers = []) {
    this.state = {};
    this.reducers = reducers;
    this.dispatch = this.dispatch.bind(this);
    this.injectReducers = this.injectReducers.bind(this);
    this.subscriptions = {};
    this.dispatch({ type: 'REACT.STORE.INITIALIZE' });
  }

  dispatch(action) {
    this.state = R.reduce(
      (newState, reducer) => reducer(newState, action),
      this.state,
      this.reducers || []
    );
    for (let i = 0; i <= SUBSCRIBE_INDEX; ++i) {
      if (this.subscriptions[i]) {
        this.subscriptions[i](this);
      }
    }
  }

  getState() {
    return this.state;
  }

  subscribe(callback) {
    this.subscriptions[++SUBSCRIBE_INDEX] = callback;
    return () => { this.subscriptions[SUBSCRIBE_INDEX] = null; };
  }

  injectReducers(newReducers) {
    if (!newReducers) { return; }
    this.reducers = R.concat(this.reducers, newReducers);
    this.dispatch({ type: 'REACT.STORE.INJECT.REDUCERS' });
  }
}

export const createStore = reducers => new Store(reducers);

class StoreFactory {
  create(lookup) {
    this.store = createStore(getReducers(lookup));
    return this.store;
  }

  bootstrap(engine) {
    engine.plugin(HOC, {
      component: StoreProvider,
      props: {
        store: this.store
      }
    });
  }
}

const getReducers = lookup => reduceLookup(lookup(REDUCER));

const reduceLookup = data => data.reduce(
  (results, plugin) => mergeInto(results, plugin), []
);

const mergeInto = (source, toMerge) =>
  source.concat(Array.isArray(toMerge) ? toMerge : [toMerge]);

export default () => new StoreFactory();
