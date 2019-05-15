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

import autocorrect from '../../../src/custom/custom.autocorrect';

describe('CustomAutocorrect', () => {
  it('should not autocorrect by default', () => {
    expect(autocorrect({ construct: {} }, 'immediate', 25)).toBe(25);
  });
  it('should use a provided autocorrect function', () => {
    expect(autocorrect({ construct: {
      autocorrect: 'immediate',
      customAutocorrect: v => v + 2
    } }, 'immediate', 25)).toBe(27);
  });
  it('should parse text.input styled events', function () {
    expect(autocorrect(
      { construct: { autocorrect: 'immediate' } },
      'immediate',
      { target: { value: 'zipper' } }
    )).toBe('zipper');
  });
  describe('text', () => {
    const spawn = props => ({
      construct: {
        fieldType: 'text',
        autocorrect: 'immediate',
        ...props
      }
    });
    it('should clip values when immediate with max', function () {
      expect(autocorrect(
        spawn({ max: 11 }),
        'immediate',
        'This string is too long'
      )).toBe('This string');
    });
    it('ignores empty values', function () {
      expect(autocorrect(
        spawn({}),
        'immediate',
        null
      )).toBe(null);
    });
    it('should not trim while typing', () => {
      expect(autocorrect(
        spawn({ autotrim: true }),
        'immediate',
        '  zip  '
      )).toBe('  zip  ');
    });
    it('should trim values by default', () => {
      expect(autocorrect(
        spawn({ autotrim: true }),
        'enabled',
        '  zip  '
      )).toBe('zip');
    });
    it('can lowercase the string', () => {
      expect(autocorrect(
        spawn({ autolower: true }),
        'immediate',
        'Help Me!'
      )).toBe('help me!');
    });
    it('can remove spaces from the string', () => {
      spawn({ autocorrect: 'immediate', autorestrictSpace: true });
      expect(autocorrect(
        spawn({ autorestrictSpace: true }),
        'immediate',
        'Help Me Mac! '
      )).toBe('HelpMeMac!');
    });
  });
  describe('number', () => {
    const spawn = props => ({
      construct: {
        fieldType: 'number',
        autocorrect: 'immediate',
        ...props
      }
    });

    it('should autocorrect the value when immediate', function () {
      expect(autocorrect(
        spawn({ max: 10 }),
        'immediate',
        100
      )).toBe(10);
    });
    it('should autocorrect min', function () {
      expect(autocorrect(
        spawn({ min: 12 }),
        'immediate',
        3
      )).toBe(12);
    });
    it('should autocorrect less', function () {
      expect(autocorrect(
        spawn({ less: 12 }),
        'immediate',
        13
      )).toBe(11);
    });
    it('should autocorrect greater', function () {
      expect(autocorrect(
        spawn({ greater: 12, step: 0.1 }),
        'immediate',
        11
      )).toBe(12.1);
    });
    it('should autocorrect integer', function () {
      expect(autocorrect(
        spawn({ integer: true }),
        'immediate',
        13.1231
      )).toBe(13);
    });
    it('should autocorrect precision', function () {
      expect(autocorrect(
        spawn({ precision: 2 }),
        'immediate',
        13.1231
      )).toBe(13.12);
    });
  });
});
