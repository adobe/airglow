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
import { POST_ENHANCER, COMPONENT, COMPOSER } from 'airglow';
import Devtools from './devtools';

export default function devtoolsPlugin({
  reduxDevtools = false,
  reduxBrowser = false
} = {}) {
  return (engine) => {
    if (reduxDevtools) {
      engine.plugin(POST_ENHANCER, Devtools.instrument());
      engine.plugin(COMPONENT, <Devtools key="c" />);
    }
    if (reduxBrowser) {
      engine.plugin(COMPOSER, browserCompose);
    }
  };
}

/* eslint-disable no-underscore-dangle */
const browserHook = () => global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const browserCompose = compose =>
  (browserHook() ? browserHook()({}) : compose);
