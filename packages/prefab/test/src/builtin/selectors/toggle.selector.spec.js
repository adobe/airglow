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

import selector from '../../../../src/builtin/selectors/toggle.selector';

let dispatch;
const name = 'pickleToggle';
const openState = {
  prefab: {
    pickleToggle: {
      store: {
        open: true
      }
    }
  }
};
const closedState = {
  prefab: {
    pickleToggle: {
      construct: {
        defaultValue: 'nine'
      },
      store: {
        open: false
      }
    }
  }
};
const defaultState = {
  prefab: {
    pickleToggle: {
      construct: {
        defaultValue: 'nine'
      }
    }
  }
};

describe('toggle.selector', () => {
  it('should get true from open state', function () {
    const toggleSelector = selector(name);
    expect(toggleSelector.isOpen(openState)).toBe(true);
  });
  it('correctly pulls the closed state', function () {
    const toggleSelector = selector(name);
    expect(toggleSelector.isClosed(closedState)).toBe(true);
  });

  it('should get false from emtpy state', function () {
    const toggleSelector = selector(name);
    expect(toggleSelector.isOpen({})).toBe(false);
  });

  it('should use the default value if not present', function () {
    const toggleSelector = selector(name);
    expect(toggleSelector.isOpen(defaultState)).toBe(true);
  });

  it('should not use default for false', function () {
    const toggleSelector = selector(name);
    expect(toggleSelector.isOpen(closedState)).toBe(false);
  });

  it('should trigger a turnOn action', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doOpen(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('should trigger a turnOff action', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doClose(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('should trigger a toggle action', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doToggle(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('works with isOpen synonyms', function () {
    const toggleSelector = selector(name);
    expect(toggleSelector.isOn(openState)).toBe(true);
    expect(toggleSelector.isSet(openState)).toBe(true);
    expect(toggleSelector.isVisible(openState)).toBe(true);
  });

  it('works with isClosed synonyms', function () {
    const toggleSelector = selector(name);
    expect(toggleSelector.isOff(closedState)).toBe(true);
    expect(toggleSelector.isNotSet(closedState)).toBe(true);
    expect(toggleSelector.isHidden(closedState)).toBe(true);
  });

  it('works with turn on', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doTurnOn(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('works with turn off', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doTurnOff(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('works with set', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doSet(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('works with unset', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doUnset(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('works with show', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doShow(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('works with hide', function () {
    const toggleSelector = selector(name);
    dispatch = sinon.spy();
    toggleSelector.doHide(dispatch);
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });
});
