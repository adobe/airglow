/*
 * ************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *   Copyright 2018 Adobe Systems Incorporated
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

import {
  deselectRowsReducer,
  toggleRowReducer
} from '../../../src/reducers/row.reducers';

const payload = row => ({ payload: {
  row
} });

const state = (allowsSelection = true, allowsMultipleSelection = true, selectedRows = []) => ({
  construct: {
    allowsSelection,
    allowsMultipleSelection
  },
  store: {
    selectedRows
  }
});

describe('toggleRowReducer', () => {
  it('should not do anything if allowsSelection is disabled', function () {
    expect(toggleRowReducer(state(false), payload('battleship')))
      .toMatchSnapshot();
  });
  it('should add a row if selected', function () {
    expect(toggleRowReducer(state(true, true, ['raft']), payload('canoe')))
      .toMatchSnapshot();
  });
  it('should add a new row and remove the previous if allowsMultipleSelection is disabled', function () {
    expect(toggleRowReducer(state(true, false, ['canoe']), payload('kayak')))
      .toMatchSnapshot();
  });
  it('should remove a row if already selected', function () {
    expect(toggleRowReducer(state(true, true, ['kayak']), payload('kayak')))
      .toMatchSnapshot();
  });
});
describe('deselectRowsReducer', () => {
  it('should deselect rows from the selectedRows state', () => {
    expect(deselectRowsReducer(state(true, true, ['canoe']), { payload: { rows: null } })).toMatchSnapshot();
  });
  it('should remove specific rows from the selectedRows state', () => {
    expect(deselectRowsReducer(state(true, true, ['canoe', 'kayak']), { payload: { rows: 'canoe' } }))
      .toMatchSnapshot();
    expect(deselectRowsReducer(state(true, true, ['canoe', 'kayak']), { payload: { rows: ['canoe'] } }))
      .toMatchSnapshot();
  });
});
