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

import { createStore } from 'redux';
import { slice, call } from '@airglow/reducers';
import prefab, { reducer, BOOTSTRAP_PREFAB } from '@airglow/prefab';
import { hasAnyDirtyForms } from '../../src';

let store;
let prefabs;

describe('HasAnyDirtyIntegration', () => {
  beforeEach(() => {
    store = createStore(
      call(
        slice('prefab').with(reducer)
      )
    );

    prefabs = prefab({
      pizzaForm: {
        type: 'form',
        whenToValidate: 'blur',
        autocorrect: 'immediate',
        passive: true,
        sourceSelector: () => ({ size: 3 }),
        fields: {
          pizza: {
            defaultValue: 'cheese',
            validator: v => (v.indexOf('z') !== -1 ? 'error.z' : false)
          },
          size: {
            fieldType: 'number',
            defaultValue: 2,
            max: 15
          }
        },
        localKeys: ['size']
      }
    });

    store.dispatch({
      type: BOOTSTRAP_PREFAB,
      payload: prefabs
    });
  });

  const getHandlers = () => prefabs.pizzaForm.handlers(store.dispatch);

  it('is not dirty be default', () => {
    expect(hasAnyDirtyForms(store.getState())).toEqual(false);
  });

  it('correctly updates the value', function () {
    getHandlers().pizzaField.onChange('meat');
    expect(hasAnyDirtyForms(store.getState())).toBeTruthy();
  });
});
