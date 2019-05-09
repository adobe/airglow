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

import { reduce } from 'ramda';
import { compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { REDUCER, POST_ENHANCER, ENHANCER, MIDDLEWARE, COMPOSER, HOC } from 'airglow';
import lazyStore from './lazy.store';

export { default as connect } from './connect';

class StoreFactory {
  create(lookup) {
    this.store = lazyStore(getReducers(lookup), getEnhancers(lookup));
    return this.store;
  }

  bootstrap(engine) {
    engine.plugin(HOC, {
      component: Provider,
      props: {
        store: this.store
      }
    });
  }
}

const getReducers = lookup => reduceLookup(lookup(REDUCER));
const getEnhancers = lookup =>
  getComposer(lookup)(
    ...getPreEnhancers(lookup),
    applyMiddleware(...getMiddleware(lookup)),
    ...getPostEnhancers(lookup)
  );
const getPreEnhancers = lookup => reduceLookup(lookup(ENHANCER));
const getPostEnhancers = lookup => reduceLookup(lookup(POST_ENHANCER));
const getMiddleware = lookup => reduceLookup(lookup(MIDDLEWARE));

const getComposer = lookup =>
  reduce(
    (acc, custom) => custom(acc),
    compose,
    lookup(COMPOSER)
  );

const reduceLookup = data => data.reduce(
  (results, plugin) => mergeInto(results, plugin), []
);

const mergeInto = (source, toMerge) =>
  source.concat(Array.isArray(toMerge) ? toMerge : [toMerge]);

export default () => new StoreFactory();
