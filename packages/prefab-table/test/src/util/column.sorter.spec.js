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

import columnSorter from '../../../src/util/column.sorter';

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

const lowerCaseSort = (a, b) => {
  if (a.toLowerCase() < b.toLowerCase()) { return -1; }
  return (a.toLowerCase() > b.toLowerCase()) ? 1 : 0;
};

const customSort = (sortBy, sortDirection) => (a, b) =>
  lowerCaseSort(a[sortBy], b[sortBy]) * sortDirection;

const customSorter = type => d =>
  (type === 'default' ? d : customSort);

describe('columnSorter', () => {
  it('should return data directly without sorter', function () {
    expect(columnSorter('name', 1, null, data)).toBe(data);
  });
  it('should use default sorter', function () {
    expect(columnSorter('name', 1, customSorter('default'), data)[1].name).toBe('banana');
  });
  it('should sort in descending order', function () {
    expect(columnSorter('name', -1, customSorter('default'), data)[2].name).toBe('apple');
  });
  it('should use custom sorter', function () {
    expect(columnSorter('color', 1, customSorter('custom'), data)[0].name).toBe('orange');
  });
});
