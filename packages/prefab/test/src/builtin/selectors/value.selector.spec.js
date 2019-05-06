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

import selector from '../../../../src/builtin/selectors/value.selector';

let dispatch;
const name = 'pickleSearch';
const valueState = {
  prefab: {
    pickleSearch: {
      store: {
        value: 'limp'
      }
    }
  }
};
const defaultState = {
  prefab: {
    pickleSearch: {
      construct: {
        defaultValue: 'crisp'
      },
      store: {
      }
    }
  }
};

describe('value.selector', () => {
  it('uses the default value', function () {
    const searchSelector = selector(name);
    expect(searchSelector.value(defaultState)).toBe('crisp');
  });
  it('returns the value if present', function () {
    const searchSelector = selector(name);
    expect(searchSelector.value(valueState)).toBe('limp');
  });

  it('should trigger a search action', function () {
    const searchSelector = selector(name);
    dispatch = sinon.spy();
    searchSelector.doChange(dispatch, 'bumpy');
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('should trigger a reset action', function () {
    const searchSelector = selector(name);
    dispatch = sinon.spy();
    searchSelector.doReset(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('should return the search action', () => {
    const searchSelector = selector(name);
    expect(searchSelector.changeAction('zippy')).toMatchSnapshot();
  });
  it('should return the reset action', () => {
    const searchSelector = selector(name);
    expect(searchSelector.resetAction).toMatchSnapshot();
  });
});
