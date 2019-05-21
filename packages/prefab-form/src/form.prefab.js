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
import formField from './form.field.prefab';
import formSelector from './selectors/form.selectors';

export default ({
  autocorrect = 'enabled',
  fields,
  name,
  sourceSelector,
  whenToValidate = 'submit',
  ...additional
}) => {
  const { prefabs, references } = processFields({
    autocorrect,
    fields,
    name,
    sourceSelector,
    whenToValidate
  });

  const selectorInternal = formSelector({ fields: references, name, ...additional });

  selectorInternal.whenToValidate = whenToValidate;
  selectorInternal.autocorrect = autocorrect;
  selectorInternal.formName = name;
  selectorInternal.type = 'form';

  R.forEachObjIndexed(
    (v, k) => { selectorInternal[k] = selectorInternal[k] || v; },
    additional
  );

  return { [name]: selectorInternal, ...prefabs };
};

const processFields = ({ fields, name: parentName, sourceSelector: parentSelector, ...config }) => {
  let prefabs = {};
  let references = {};
  R.forEachObjIndexed(
    ({ type, sourceSelector, fieldName, ...options }, keyName) => {
      const customSource = parentSelector ? state => parentSelector(state)[keyName] : null;
      const storeName = `${parentName}#${keyName}`;
      const useFieldName = fieldName || `${keyName}Field`;
      const results = formField({
        name: storeName,
        externalName: keyName,
        fieldName: useFieldName,
        sourceSelector: sourceSelector || customSource,
        ...config,
        ...options
      });
      prefabs = R.assoc(storeName, results[storeName], prefabs);
      references = R.assoc(useFieldName, results[storeName], references);
    },
    fields
  );
  return {
    prefabs,
    references
  };
};
