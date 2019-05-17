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

import selector from '../../../src/selectors/form.field.selectors';

const state = {
  prefab: {
    size: {
      construct: {
        fieldType: 'number',
        required: true,
        max: 21,
        whenToValidate: 'blur',
        defaultValue: 3
      },
      store: {
        value: 29,
        hasBlurred: true
      }
    }
  }
};

describe('FormFieldSelectors', () => {
  let field;
  let dispatch;
  beforeEach(() => {
    field = selector('size');
    dispatch = sinon.spy();
  });
  describe('handlers', () => {
    let handlers;
    beforeEach(() => {
      handlers = field.handlers(dispatch);
    });
    it('fills out the bundle', () => {
      expect(field.state(state)).toMatchSnapshot();
    });
    it('triggers a change event', () => {
      handlers.onChange(32);
      expect(dispatch.getCall(0).args).toMatchSnapshot();
    });
    it('triggers a focus event', () => {
      handlers.onFocus();
      expect(dispatch.getCall(0).args).toMatchSnapshot();
    });
    it('triggers a blur event', () => {
      handlers.onBlur();
      expect(dispatch.getCall(0).args).toMatchSnapshot();
    });
    it('triggers a submit event', () => {
      handlers.onSubmit();
      expect(dispatch.getCall(0).args).toMatchSnapshot();
    });
    it('triggers a reset event', () => {
      handlers.onReset();
      expect(dispatch.getCall(0).args).toMatchSnapshot();
    });
  });
  it('creates a change action', () => {
    expect(field.changeAction(78)).toMatchSnapshot();
  });
  it('creates a submit action', () => {
    expect(field.submitAction()).toMatchSnapshot();
  });
  it('fetches the current value', () => {
    expect(field.value(state)).toBe(29);
  });
  it('fetches the current error', () => {
    expect(field.error(state)).toBe('error.number.max');
  });
});
