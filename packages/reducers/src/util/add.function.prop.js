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

// Functions are objects, but object.assign or ramda assoc do
// not work with them. So to clone it, I create an arrow function
// that just calls the function and then set any key value pairs
// that were on the original function

import { forEach, keysIn, curry } from 'ramda';

/* eslint-disable no-param-reassign */
const copyVar = curry((source, target, key) => {
  target[key] = source[key];
});
/* eslint-enable no-param-reassign */

const cloneFunction = (funcIn) => {
  const funcOut = (...a) => funcIn(...a);
  forEach(copyVar(funcIn, funcOut), keysIn(funcIn));
  return funcOut;
};

export default curry((key, value, funcIn) => {
  const funcOut = cloneFunction(funcIn);
  funcOut[key] = value;
  return funcOut;
});
