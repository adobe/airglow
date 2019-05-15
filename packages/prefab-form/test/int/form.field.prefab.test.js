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
import '../../src';

let store;
let prefabs;

describe('FormFieldPrefabIntegration', () => {
  beforeEach(() => {
    store = createStore(
      call(
        slice('prefab').with(reducer)
      )
    );

    prefabs = prefab({
      pizza: {
        type: 'formField',
        defaultValue: 'cheese',
        validator: v => (v.indexOf('z') !== -1 ? 'error.z' : false),
        whenToValidate: 'blur'
      },
      size: {
        type: 'formField',
        fieldType: 'number',
        defaultValue: 2,
        max: 15,
        autocorrect: 'immediate'
      }
    });
    store.dispatch({
      type: BOOTSTRAP_PREFAB,
      payload: prefabs
    });
  });

  it('should correctly select the initial values', function () {
    expect(prefabs.pizza.value(store.getState())).toBe('cheese');
    expect(prefabs.size.value(store.getState())).toBe(2);
  });

  it('should correctly update the value', function () {
    const handlers = prefabs.pizza.handlers(store.dispatch);
    handlers.onChange('meat');
    expect(prefabs.pizza.value(store.getState())).toBe('meat');
  });

  it('should autocorrect', () => {
    const handlers = prefabs.size.handlers(store.dispatch);
    handlers.onChange(52);
    expect(prefabs.size.value(store.getState())).toBe(15);
  });

  it('should validate', () => {
    expect(prefabs.pizza.isInvalid(store.getState())).toBe(false);
    const handlers = prefabs.pizza.handlers(store.dispatch);
    handlers.onChange('meatz');
    expect(prefabs.pizza.state(store.getState())).toMatchSnapshot();

    handlers.onBlur();
    expect(prefabs.pizza.state(store.getState())).toMatchSnapshot();
    expect(prefabs.pizza.isInvalid(store.getState())).toBe('error.z');
  });

  it('can be dirty', () => {
    expect(prefabs.pizza.isDirty(store.getState())).toBe(false);
    const handlers = prefabs.pizza.handlers(store.dispatch);
    handlers.onChange('meat');
    expect(prefabs.pizza.isDirty(store.getState())).toBe(true);
  });

  it('resets', () => {
    const handlers = prefabs.pizza.handlers(store.dispatch);
    handlers.onChange('meat');
    handlers.onReset();
    expect(prefabs.pizza.value(store.getState())).toBe('cheese');
  });
});
