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

// by default, we return a null reducer, but provide a with function that
// allows us to provide a real reducer
//
// usage: slice('pizza').using(pizzaReducer)
//

import { assoc, curry } from 'ramda';
import addProp from '../util/add.function.prop';

const nullReducer = () => {};
const reducer = curry(
  (key, reducerIn, state, action) =>
    assoc(key, reducerIn(state[key], action, { fullState: state }), state)
);

export default key =>
  addProp('with', reducer(key), nullReducer);
