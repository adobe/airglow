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

import { assocPath } from 'ramda';
import selector from '../../src/selector';


let crayonSelector;
let formSelector;
let validState;
const dispatch = 'Dispatch!';

const invalidState = {
  prefab: {
    crayonForm: {
      construct: {
        fields: 'config fields'
      },
      store: {
        fields: 'store fields'
      }
    }
  }
};

const spawnState = () => {
  formSelector = sinon.stub().returns({ data: 'results!' });
  validState = assocPath(
    ['prefab', 'crayonForm', 'construct'],
    { fields: 'config fields' },
    invalidState
  );
};

describe('prefab selector', () => {
  beforeEach(() => {
    spawnState();
    crayonSelector = selector(formSelector, 'crayonForm')('selector options!');
  });

  it('should properly pass the values into the selector', function () {
    crayonSelector(validState, dispatch);
    expect(formSelector.lastCall.args[0]).toMatchSnapshot();
  });
  it('should return the results of the selector', function () {
    expect(crayonSelector(validState, dispatch)).toMatchSnapshot();
  });
});
