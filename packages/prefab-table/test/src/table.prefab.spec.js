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

import tablePrefab from '../../src/table.prefab';

const dataSelector = state => state;

const columns = {
  name: {
    sorter: 'defalut'
  },
  color: {
    sorter: () => () => -1
  }
};

describe('tablePrefab', () => {
  it('should return the table', function () {
    expect(tablePrefab({ name: 'fruits', dataSelector, columns })).toMatchSnapshot();
  });
});
