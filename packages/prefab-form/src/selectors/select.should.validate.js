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

import { getConstruct, getStore } from './select.store.paths';

const ALWAYS = 'always';
const FOCUS  = 'focus';
const BLUR   = 'blur';
const NEVER  = 'never';

export default (name, state) => {
  const { whenToValidate = NEVER } = getConstruct(name)(state);
  const { hasFocussed, hasBlurred } = getStore(name)(state);

  if (typeof whenToValidate === 'function') { return whenToValidate(state); }
  if (whenToValidate === ALWAYS) { return true; }
  if (whenToValidate === FOCUS) { return hasFocussed || hasBlurred; }
  if (whenToValidate === BLUR) { return hasBlurred; }
  return false;
};
