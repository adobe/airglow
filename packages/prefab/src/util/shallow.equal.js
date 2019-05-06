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

export default (objA, objB) => {
  if (objA === objB) {
    return true;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }
  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0, len = keysA.length; i < len; i++) {
    const key = keysA[i];
    if (!hasOwn.call(objB, key)) { return false; }
    if (objA[key] !== objB[key]) { return false; }
  }
  return true;
};
