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

import selector from '../../../../src/builtin/selectors/list.selector';

let dispatch;
const name = 'colorList';
const defaultState = {
  prefab: {
    colorList: { construct: { defaultValue: ['red', 'black'] } }
  }
};
const filledState = {
  prefab: {
    colorList: { store: { value: ['yellow', 'green'] } }
  }
};

describe('list.selector', () => {
  it('uses the default value', function () {
    const listSelector = selector(name);
    expect(listSelector.value(defaultState)).toMatchSnapshot();
  });
  it('returns the value if present', function () {
    const listSelector = selector(name);
    expect(listSelector.value(filledState)).toMatchSnapshot();
  });

  it('should trigger a set action', function () {
    const listSelector = selector(name);
    dispatch = sinon.spy();
    listSelector.doSet(dispatch, ['white']);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('should trigger an add action', function () {
    const listSelector = selector(name);
    dispatch = sinon.spy();
    listSelector.doAdd(dispatch, 'green');
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });
  it('should trigger a remove action', function () {
    const listSelector = selector(name);
    dispatch = sinon.spy();
    listSelector.doRemove(dispatch, 'yellow');
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('should return the set action', () => {
    const listSelector = selector(name);
    expect(listSelector.setAction('zippy')).toMatchSnapshot();
  });
  it('should return the add action', () => {
    const listSelector = selector(name);
    expect(listSelector.addAction('yellow')).toMatchSnapshot();
  });
  it('should return the remove action', () => {
    const listSelector = selector(name);
    expect(listSelector.removeAction('white')).toMatchSnapshot();
  });
  it('should return the remove at action', () => {
    const listSelector = selector(name);
    expect(listSelector.removeAtAction(2)).toMatchSnapshot();
  });
});
