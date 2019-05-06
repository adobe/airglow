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

import addProp from '../../../src/util/add.function.prop';

let callback;

describe('addFunctionProp', () => {
  beforeEach(() => {
    callback = sinon.spy();
  });
  it('should add the prop', function () {
    expect(addProp('type', 'squid', callback).type).toBe('squid');
  });
  it('should trigger the initial function', function () {
    addProp('data', 'squid', callback)();
    expect(callback.callCount).toBe(1);
  });
  it('should copy props from original function', function () {
    callback.speed = 'fast';
    expect(addProp('type', 'squid', callback).speed).toBe('fast');
  });
  it('should call original when nested', function () {
    const callback2 = addProp('type', 'squid', callback);
    addProp('speed', 'fast', callback2)();
    expect(callback.callCount).toBe(1);
  });
  it('should be curried', function () {
    const myAdd = addProp('type', 'squid');
    expect(myAdd(callback).type).toBe('squid');
  });
});
