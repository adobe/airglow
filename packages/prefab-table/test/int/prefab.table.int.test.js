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

import { slice, call } from '@airglow/reducers';
import { createStore } from 'redux';
import prefabFactory, { reducer, BOOTSTRAP_PREFAB } from '@airglow/prefab';
import '../../src/index';

let store;
let prefabs;

describe('PrefabTableIntegration', () => {
  beforeEach(() => {
    store = createStore(call(
      slice('prefab').with(reducer)
    ));

    prefabs = prefabFactory({
      testTable: {
        type: 'table',
        allowsMultipleSelection: false,
        dataSelector: () => [
          {
            container: 'beaker',
            contents: 'vinegar',
            amount: 2
          },
          {
            container: 'test tube',
            contents: 'baking soda',
            amount: 1
          }
        ],
        defaultSort: {
          column: 'container',
          order: -1
        },
        columns: {
          container: {
            sorter: 'default'
          },
          contents: {
            sorter: 'default'
          }
        }
      }
    });
    store.dispatch({
      type: BOOTSTRAP_PREFAB,
      payload: prefabs
    });
  });

  it('updates the selected row', () => {
    store.dispatch(prefabs.testTable.toggleRowAction({ container: 'test tube', contents: 'baking soda', amount: 1 }));
    expect(prefabs.testTable.selectedData(store.getState())).toMatchObject([{ container: 'test tube', contents: 'baking soda' }]);
    expect(prefabs.testTable.state(store.getState()).selectedRows).toContain(0);
    prefabs.testTable.handlers(store.dispatch).onHeaderClick({}, 'container');
    expect(prefabs.testTable.state(store.getState()).selectedRows).toContain(1);
    store.dispatch(prefabs.testTable.deselectRowsAction());
    expect(prefabs.testTable.state(store.getState()).selectedRows.length).toBe(0);
  });
  it('adds and removes a column', () => {
    store.dispatch(prefabs.testTable.addColumnAction('amount', { name: 'amount', sorter: 'default' }));
    prefabs.testTable.handlers(store.dispatch).onHeaderClick({}, 'amount');
    store.dispatch(prefabs.testTable.toggleRowAction({ container: 'beaker', contents: 'vinegar', amount: 2 }));
    expect(prefabs.testTable.state(store.getState()).selectedRows).toContain(1);
    store.dispatch(prefabs.testTable.removeColumnAction('amount'));
    expect(prefabs.testTable.state(store.getState()).columns.amount).not.toBeDefined();
  });
  it('hides and shows columns', () => {
    prefabs.testTable.handlers(store.dispatch).hideColumn('container');
    store.dispatch(prefabs.testTable.toggleRowAction({ container: 'beaker', contents: 'vinegar', amount: 2 }));
    expect(prefabs.testTable.state(store.getState()).hiddenColumns.container).toBeDefined();
    prefabs.testTable.handlers(store.dispatch).showColumn('container');
    expect(prefabs.testTable.state(store.getState()).hiddenColumns).toMatchObject({});
  });
});
