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

import { REDUCER } from 'airglow';
import { slice } from '@airglow/reducers';
import { last } from 'ramda';
import reducer from './reducer';

const STORE_KEY = '_test_dispatches';

export default function testPlugin() {
  return (engine) => {
    engine.plugin(REDUCER, slice(STORE_KEY).with(reducer));
  };
}

export const lastDispatch = state => last(state[STORE_KEY]);
export const dispatchList = state => state[STORE_KEY];
