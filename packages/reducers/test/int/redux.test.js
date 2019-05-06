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
import { assoc, append, prop } from 'ramda';

import { slice, call, toggle, reset, extract, initialize, reduce }
  from '../../src/index';

let store;

const toppingReducer = (state, action) => assoc(
  'toppings',
  append(action.payload, prop('toppings', state)),
  state
);
const enabledValidator = state => !!state.enabled;

const reducers = initialize(
  {
    mode: 'pizza'
  },
  call(
    slice('pizza').with(initialize(
      {
        crust: 'regular',
        size: 'medium',
        toppings: [],
        enabled: true
      },
      call(
        reset().for('startPizza', 'cancelPizza'),
        extract('crust', 'size', 'toppings').for('updatePizza'),
        reduce('enabled').to(true).for('startPizza'),
        reduce('enabled').to(false).for('startIceCream'),
        call(toppingReducer).for('addTopping').when(enabledValidator)
      )
    )),
    slice('iceCream').with(initialize(
      {
        flavor: 'vanilla',
        container: 'cone',
        toppings: [],
        enabled: false
      },
      call(
        reset().for('startIceCream', 'cancelIceCream'),
        reduce('enabled').to(false).for('startPizza'),
        reduce('enabled').to(true).for('startIceCream'),
        call(toppingReducer).for('addTopping').when(enabledValidator)
      )
    )),
    reduce('mode').to('pizza').for('startPizza'),
    reduce('mode').to('iceCream').for('startIceCream'),
    toggle('showCart').for('toggleCart')
  )
);

const dispatch = (type, payload) => store.dispatch({ type, payload });

describe('Redux Integration Test', () => {
  beforeEach(() => {
    store = createStore(reducers);
  });
  it('should initilize correctly', function () {
    expect(store.getState()).toMatchSnapshot();
  });
  it('should extract properly', function () {
    dispatch('updatePizza', { crust: 'deep', size: 'large', toppings: ['sausage', 'peppers'] });
    expect(store.getState()).toMatchSnapshot();
  });
  it('should reset properly', function () {
    dispatch('updatePizza', { crust: 'deep', size: 'large', toppings: ['sausage', 'peppers'] });
    dispatch('cancelPizza');
    expect(store.getState()).toMatchSnapshot();
  });
  it('should reduce "to" values', function () {
    dispatch('startIceCream');
    expect(store.getState()).toMatchSnapshot();
  });
  it('should call if a "when" validator matches', function () {
    dispatch('startIceCream');
    dispatch('addTopping', 'pineapple');
    expect(store.getState()).toMatchSnapshot();
  });
  it('should toggle correctly', function () {
    dispatch('toggleCart');
    expect(store.getState()).toMatchSnapshot();
  });
});
