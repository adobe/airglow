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

/* eslint-disable no-console */

import React from 'react';
import ReactStore from '@airglow/store-react';
import { call } from '@airglow/reducers';
import plugin from '../../src/index';
import { renderAirglow } from '../../../../test/util/test.utils';

let originalInfo;
const TestComponent = () => (
  <div>Content</div>
);

const orderPizzaAction = { type: 'ORDER_PIZZA' };

const orderPizza = ({ dispatch }) => {
  dispatch(orderPizzaAction);
};

const listPizzas = ({ state }) => state.pizzas;

const reducer = (state) => {
  const { pizzas = 0 } = state;
  return { ...state, pizzas: pizzas + 1 };
};
const reducers = [call(
  call(reducer).for('ORDER_PIZZA')
)];

const config = {
  help: 'helpMe',
  consoleCommands: {
    pizzas: {
      description: 'prints out the number of pizzas',
      command: listPizzas
    }
  }
};

const consoleCommands = {
  orderPizza: {
    description: 'increases the number of pizzas',
    command: orderPizza
  }
};


describe('AirglowConsolePluginIntTest', () => {
  const spawn = () => {
    renderAirglow(
      <TestComponent />,
      {
        store: ReactStore,
        plugins: [plugin(config)],
        bootstrap: {
          consoleCommands,
          reducers
        }
      }
    );
  };

  beforeEach(() => {
    originalInfo = console.info;
    console.info = sinon.spy();
    spawn();
  });
  afterEach(() => {
    console.info = originalInfo;
  });

  it('should build out the help', () => {
    window.helpMe();
    expect(console.info.firstCall.args).toMatchSnapshot();
    expect(console.info.secondCall.args).toMatchSnapshot();
    expect(console.info.thirdCall.args).toMatchSnapshot();
  });

  it('properly calls resitered commands', () => {
    window.orderPizza();
    window.orderPizza();
    expect(window.pizzas()).toBe(2);
  });
});
