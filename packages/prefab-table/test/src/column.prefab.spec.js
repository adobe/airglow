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

import columnPrefab from '../../src/column.prefab';

let sorter;
let column;
const defaultSort = () => -1;
const reverse = () => 1;

const spawn = (options) => {
  column = columnPrefab(options);
  sorter = column.sorter(defaultSort);
};

describe('columnPrefab', () => {
  describe('sorter', () => {
    it('should not sort', function () {
      spawn();
      expect(sorter).toBeUndefined();
    });
    it('should use default sorter', function () {
      spawn({ sorter: 'default' });
      expect(sorter).toBe(defaultSort);
    });
    it('should use customize sorter', function () {
      spawn({ sorter: reverse });
      expect(sorter).toBe(reverse);
    });
  });
});
