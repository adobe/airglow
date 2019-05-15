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

import validator from '../../../src/custom/custom.validation';

describe('CustomValidation', () => {
  it('doesnt validate with nonmatching types', () => {
    expect(validator({ construct: {} }, 'teddy')).toBe(false);
  });
  describe('text', () => {
    const spawn = options => ({
      construct: {
        type: 'text',
        ...options
      }
    });
    it('should pass on empty', function () {
      const state = spawn({ });
      expect(validator(state, '')).toBe(false);
    });
    it('should validate min', function () {
      const state = spawn({ min: 10 });
      expect(validator(state, 'abc')).toBe('error.string.min');
      expect(validator(state, 'abcdefghijklmnop')).toBe(false);
    });
    it('should validate max', function () {
      const state = spawn({ max: 10 });
      expect(validator(state, 'abcdefghijklmnop')).toBe('error.string.max');
      expect(validator(state, 'abc')).toBe(false);
    });
    it('should validate length', function () {
      const state = spawn({ length: 6 });
      expect(validator(state, 'abcdefghijklmnop')).toBe('error.string.length');
      expect(validator(state, 'abcdef')).toBe(false);
    });
    it('should validate regex', function () {
      const state = spawn({ regex: /abc.*/ });
      expect(validator(state, 'bcdef')).toBe('error.string.regex');
      expect(validator(state, 'abcdef')).toBe(false);
    });
    it('should validate alphaNum', function () {
      const state = spawn({ fieldType: 'alphanum' });
      expect(validator(state, 'abc12!')).toBe('error.string.alphanum');
      expect(validator(state, 'abc123')).toBe(false);
    });
    it('should validate email', function () {
      const state = spawn({ fieldType: 'email' });
      expect(validator(state, 'abc')).toBe('error.string.email');
      expect(validator(state, 'abc@abc.com')).toBe(false);
    });
    it('should validate ip', function () {
      const state = spawn({ fieldType: 'ip' });
      expect(validator(state, 'abc')).toBe('error.string.ip');
      expect(validator(state, '10.1.10.1')).toBe(false);
    });
    it('should validate uri', function () {
      const state = spawn({ fieldType: 'uri' });
      expect(validator(state, 'abc cd')).toBe('error.string.uri');
      expect(validator(state, 'http://abc.com')).toBe(false);
    });
    it('should validate json', () => {
      const state = spawn({ fieldType: 'json' });
      expect(validator(state, '{ a: pickle }')).toBe('error.string.json');
      expect(validator(state, '{ "a": "pickle" }')).toBe(false);
      expect(validator(state, '')).toBe('error.string.json');
    });
    it('should chain validations', function () {
      const state = spawn({ min: 10, fieldType: 'email' });
      expect(validator(state, 'abc@a.com')).toBe('error.string.min');
      expect(validator(state, 'abcdefghijklmnop')).toBe('error.string.email');
      expect(validator(state, 'abc@abc.com')).toBe(false);
    });
    it('should not accept numbers', function () {
      const state = spawn({ });
      expect(validator(state, 1234)).toBe('error.string.base');
    });
  });
  describe('number', () => {
    const spawn = options => ({
      construct: {
        fieldType: 'number',
        ...options
      }
    });
    it('should validate min', function () {
      const state = spawn({ min: 10 });
      expect(validator(state, 7)).toBe('error.number.min');
      expect(validator(state, 25)).toBe(false);
    });
    it('should validate max', function () {
      const state = spawn({ max: 10 });
      expect(validator(state, 7)).toBe(false);
      expect(validator(state, 25)).toBe('error.number.max');
    });
    it('should chain validators', function () {
      const state = spawn({ min: 3, max: 10 });
      expect(validator(state, 7)).toBe(false);
      expect(validator(state, 2)).toBe('error.number.min');
      expect(validator(state, 12)).toBe('error.number.max');
    });
    it('should validate greater', function () {
      const state = spawn({ greater: 7 });
      expect(validator(state, 7)).toBe('error.number.greater');
      expect(validator(state, 7.00001)).toBe(false);
    });
    it('should validate less', function () {
      const state = spawn({ less: 7 });
      expect(validator(state, 7)).toBe('error.number.less');
      expect(validator(state, 6.999999)).toBe(false);
    });
    it('should validate integer', function () {
      const state = spawn({ integer: true });
      expect(validator(state, 7)).toBe(false);
      expect(validator(state, 7.00001)).toBe('error.number.integer');
    });
    it('should validate precision', function () {
      const state = spawn({ precision: 2 });
      expect(validator(state, 7)).toBe('error.number.precision');
      expect(validator(state, 7.01)).toBe(false);
      expect(validator(state, 7.00001)).toBe('error.number.precision');
    });
    it('should not accept strings', function () {
      const state = spawn({ });
      expect(validator(state, 'abc')).toBe('error.number.base');
    });
  });
});
