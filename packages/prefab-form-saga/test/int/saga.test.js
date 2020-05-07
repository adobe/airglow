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

import React from 'react';
import { renderAirglow } from '@airglow/test-utils';
import ReduxStore, { connect } from '@airglow/store-redux';
import prefabPlugin from '@airglow/plugin-prefab';
import sagaPlugin from '@airglow/plugin-saga';
import testPlugin, { dispatchList } from '@airglow/plugin-test';
import prefab from '@airglow/prefab';

import '@airglow/prefab-form';

import sagas from '../../src/index';

let tree;
let prefabs;
let actions;
let mockSaga;

const mapState = state => ({
  ...prefabs.favorites.state(state)
});

const mapHandlers = dispatch => ({
  // onColor: v => dispatch(prefabs.color.changeAction(v)),
  ...prefabs.favorites.handlers(dispatch)
});

const TestComponent = ({ colorField, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      value={colorField.value || ''}
      onChange={colorField.onChange}
    />
  </form>
);

const TestConnected = connect(mapState, mapHandlers)(TestComponent);

describe('PrefabSagaIntegrationTest', () => {
  beforeEach(() => {
    actions = {
      invalid: construct => ({ type: 'invalid', construct }),
      invalid2: construct => ({ type: 'invalid2', construct }),
      submit: (form, values) => ({ type: 'submit', form, values }),
      submit2: (form, values) => ({ type: 'submit2', form, values }),
      success: 'success',
      success2: 'success2',
      error: 'error',
      error2: 'error2'
    };
    mockSaga = sinon.spy();

    prefabs = prefab({
      favorites: {
        type: 'form',
        fields: {
          color: { type: 'value', required: true }
        },
        invalidAction: actions.invalid,
        invalidActions: [actions.invalid2],
        validAction: actions.submit,
        validActions: [actions.submit2],
        successAction: actions.success,
        successActions: [actions.success2],
        errorAction: actions.error,
        errorActions: [actions.error2],
        submitSaga: mockSaga
      }
    });
    tree = renderAirglow(
      <TestConnected />,
      {
        store: ReduxStore,
        plugins: [prefabPlugin(), sagaPlugin(), testPlugin()],
        bootstrap: { prefab: prefabs, sagas }
      }
    );
  });

  it('errors if invalid', () => {
    tree.find('form').prop('onSubmit')();

    const dispatches = dispatchList(tree.getState());
    expect(dispatches[dispatches.length - 2]).toMatchSnapshot();
    expect(dispatches[dispatches.length - 3]).toMatchSnapshot();
  });

  it('submits if valid', () => {
    tree.find('input').simulate('change', { target: { value: 'Purple!' } });
    tree.find('form').prop('onSubmit')();

    const dispatches = dispatchList(tree.getState());
    expect(dispatches[dispatches.length - 2]).toMatchSnapshot();
    expect(dispatches[dispatches.length - 3]).toMatchSnapshot();
  });

  it('calls a provided submit saga', () => {
    tree.find('input').simulate('change', { target: { value: 'Purple!' } });
    tree.find('form').prop('onSubmit')();
    expect(mockSaga.getCall(0).args).toMatchSnapshot();
  });
});
