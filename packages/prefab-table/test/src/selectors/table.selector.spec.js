/*
 * ************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *   Copyright 2017 Adobe Systems Incorporated
 *   All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by all applicable intellectual property
 * laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ************************************************************************
 */

import * as R from 'ramda';
import selector from '../../../src/selectors/table.selectors';

let dispatch;
const data = [
  {
    name: 'apple',
    color: 'red'
  },
  {
    name: 'orange',
    color: 'orange'
  },
  {
    name: 'banana',
    color: 'Yellow'
  }
];

const dataSelector = state => data || state;
const name = 'fruits';
const makeState = (column, order) => ({
  prefab: {
    fruits: {
      construct: {
        columns: {
          name: {
            sorter: d => d
          }
        }
      },
      store: {
        selectedRows: [{ name: 'orange', color: 'orange' }],
        sort: {
          order,
          column
        }
      }
    }
  }
});

describe('table.selector', () => {
  let tableSelector;
  beforeEach(() => {
    tableSelector = selector(name, dataSelector);
  });

  describe('bundle', () => {
    it('should get -1 from state', function () {
      expect(tableSelector.state(makeState('name', -1)).sortDirection).toBe(-1);
    });

    it('should get name from state', function () {
      expect(tableSelector.state(makeState('name', -1)).sortBy).toBe('name');
    });

    it('should get sorted data from state', function () {
      expect(tableSelector.state(makeState('name', -1)).data[0].name).toBe('orange');
    });

    it('should get selected row data from state', function () {
      expect(tableSelector.state(makeState('name', -1)).selectedData).toMatchSnapshot();
    });

    it('should get selected rows from state', function () {
      expect(tableSelector.state(makeState('name', -1)).selectedRows).toContain(0);
    });

    it('should trigger an onHeaderClick action', function () {
      dispatch = sinon.spy();
      tableSelector.handlers(dispatch).onHeaderClick({}, 'color');
      expect(dispatch.getCall(0).args).toMatchSnapshot();
    });

    it('should trigger an onRowClick action', function () {
      dispatch = sinon.spy();
      tableSelector.handlers(dispatch).onRowClick({ name: 'orange', color: 'orange' }, 1);
      expect(dispatch.getCall(0).args).toMatchSnapshot();
    });

    it('should handle a dataSelector that returns undefined', () => {
      const nullDataTableSelector = selector(name, () => undefined);
      expect(nullDataTableSelector.state(makeState('name', -1)).data).toMatchSnapshot();
    });

    it('should sort with a defaultSort', () => {
      const defaultSortState = R.assocPath(
        ['prefab', 'fruits', 'construct', 'defaultSort'],
        { column: 'name', order: -1 },
        makeState()
      );
      expect(tableSelector.state(defaultSortState).sortBy).toBe('name');
      expect(tableSelector.state(defaultSortState).sortDirection).toBe(-1);
      expect(tableSelector.state(makeState('name', -1)).data[0].name).toBe('orange');
    });
  });

  it('gets the selected rows', () => {
    expect(tableSelector.selectedData(makeState('name', -1))).toMatchSnapshot();
  });

  it('creates a deselect rows action', () => {
    expect(tableSelector.deselectRowsAction()).toMatchSnapshot();
  });

  it('creates a toggle row action', () => {
    expect(tableSelector.toggleRowAction()).toMatchSnapshot();
  });
});
