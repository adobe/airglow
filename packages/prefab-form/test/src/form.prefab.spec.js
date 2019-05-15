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

import prefab from '@airglow/prefab';
import '../../src';

describe('FormPrefab', () => {
  it('generates prefabs for each field', () => {
    const prefabs = prefab({
      pizzaForm: {
        type: 'form',
        fields: {
          pizza: { },
          size: { }
        }
      }
    });
    expect(prefabs).toMatchSnapshot();
    expect(prefabs['pizzaForm#pizza']).toMatchSnapshot();
  });
  it('passes in whenToValidate', () => {
    const prefabs = prefab({
      pizzaForm: {
        type: 'form',
        whenToValidate: 'now',
        fields: {
          pizza: { whenToValidate: 'later' },
          size: { }
        }
      }
    });
    expect(prefabs['pizzaForm#pizza'].whenToValidate).toBe('later');
    expect(prefabs['pizzaForm#size'].whenToValidate).toBe('now');
  });
  it('passes in autocorrect', () => {
    const prefabs = prefab({
      pizzaForm: {
        type: 'form',
        autocorrect: 'now',
        fields: {
          pizza: { autocorrect: 'later' },
          size: { }
        }
      }
    });
    expect(prefabs['pizzaForm#pizza'].autocorrect).toBe('later');
    expect(prefabs['pizzaForm#size'].autocorrect).toBe('now');
  });
  it('passes in source data', () => {
    const prefabs = prefab({
      pizzaForm: {
        type: 'form',
        sourceSelector: () => ({ size: 9, pizza: 'meat' }),
        fields: {
          pizza: { sourceSelector: () => 'vegis' },
          size: { }
        }
      }
    });
    expect(prefabs['pizzaForm#pizza'].sourceSelector()).toBe('vegis');
    expect(prefabs['pizzaForm#size'].sourceSelector()).toBe(9);
  });
});
