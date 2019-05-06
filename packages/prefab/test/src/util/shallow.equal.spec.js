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

import shallowEquals from '../../../src/util/shallow.equal';

const objA = { a: 1 };
const objB = { a: 1, b: 2 };
const objC = { a: 1, b: 3 };
const objD = { a: 1, c: 2 };
const objE = { a: 1, b: 2 };


it('should return true because two objects are deeply equal', () => {
  expect(shallowEquals(objA, objA)).toBe(true);
});

it('should return false because keyset length are different', () => {
  expect(shallowEquals(objA, objB)).toBe(false);
});

it('should return false because objA has fewer keys than objB', () => {
  expect(shallowEquals(objA, objB)).toBe(false);
});

it('should return false because objD does not have b property', () => {
  expect(shallowEquals(objB, objD)).toBe(false);
});

it('should return false because objB has different b property than objC', () => {
  expect(shallowEquals(objB, objC)).toBe(false);
});

it('should return true because all properties are shallowly equal', () => {
  expect(shallowEquals(objB, objE)).toBe(true);
});
