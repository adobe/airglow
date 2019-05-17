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
import reduce from './reducers';
import formFieldSelector from './selectors/form.field.selectors';

export default ({
  name,
  fieldName,
  externalName,
  defaultValue,
  fieldType = 'text',
  ...additional
}) => {
  const selectorInternal = formFieldSelector(name);
  selectorInternal.name = name;
  selectorInternal.externalName = externalName || name;
  selectorInternal.fieldName = fieldName || name;
  selectorInternal.defaultValue = defaultValue;
  selectorInternal.fieldType = fieldType;
  selectorInternal.reduce = reduce;

  R.forEachObjIndexed((v, k) => { selectorInternal[k] = v; }, additional);

  return { [name]: selectorInternal };
};
