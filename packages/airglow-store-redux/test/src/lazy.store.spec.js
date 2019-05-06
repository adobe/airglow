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

import sinon from 'sinon';
import { call } from '@airglow/reducers';
import lazyStore from '../../src/lazy.store';

describe('LazyStore', () => {
  let reducerA;
  let reducerB;
  beforeEach(() => {
    reducerA = sinon.spy();
    reducerB = sinon.spy();
  });
  it('creates a redux store', () => {
    const store = lazyStore([call(reducerA).for('TEST')]);
    store.dispatch({ type: 'TEST' });
    expect(reducerA.callCount).toBe(1);
  });
  it('wont fail without reducers', () => {
    const store = lazyStore();
    expect(store).toMatchSnapshot();
  });
  it('can inject new reducers', () => {
    const store = lazyStore();
    store.injectReducers([call(reducerB).for('TESTB')]);
    store.dispatch({ type: 'TESTB' });
    expect(reducerB.callCount).toBe(1);
  });
  it('doesnt replace old reducers with new ones', () => {
    const store = lazyStore([call(reducerA).for('TESTA')]);
    store.injectReducers([call(reducerB).for('TESTB')]);
    store.dispatch({ type: 'TESTA' });
    expect(reducerA.callCount).toBe(1);
  });
  it('doesnt fail if new reducers are null', () => {
    const store = lazyStore([call(reducerA).for('TESTA')]);
    expect(() => store.injectReducers()).not.toThrowError();
  });
});
