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

import { sortReducer } from '../../../src/reducers/sort.reducers';

const payload = column => ({ payload: {
  construct: 'fruit',
  column
} });

const state = (order, column) => ({
  construct: {
    columns: {
      name: {},
      color: {}
    }
  },
  store: {
    sort: {
      order,
      column
    }
  }
});

const initState = {
  construct: {
    columns: {
      name: {},
      color: {}
    }
  },
  store: {
  }
};

const defaultState = {
  construct: {
    columns: {
      name: {},
      color: {}
    },
    defaultSort: {
      column: 'name',
      order: 1
    }
  },
  store: {
  }
};


describe('sortReducer', () => {
  it('should ignore', function () {
    expect(sortReducer(initState, payload('type')))
      .toMatchSnapshot();
  });
  it('should set column and order to 1 from empty state', function () {
    expect(sortReducer(initState, payload('name')))
      .toMatchSnapshot();
  });
  it('should use the default values', function () {
    expect(sortReducer(defaultState, payload('name')))
      .toMatchSnapshot();
  });
  it('should toggle sort order for same column', function () {
    expect(sortReducer(state(1, 'name'), payload('name')))
      .toMatchSnapshot();
  });
  it('should sort new column', function () {
    expect(sortReducer(state(1, 'name'), payload('color')))
      .toMatchSnapshot();
  });
});
