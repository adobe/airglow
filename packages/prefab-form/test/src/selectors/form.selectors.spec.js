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

import selector from '../../../src/selectors/form.selectors';

describe('FormSelectors', () => {
  let form;
  let dispatch;
  beforeEach(() => {
    form = selector({
      name: 'moniesForm',
      fields: {
        size: {
          externalName: 'size',
          handlers: d => ({
            onChange: v => d('onChange', v),
            onReset: () => d('onReset')
          }),
          resetAction: construct => ({ construct, type: 'onReset' }),
          submitAction: construct => ({ construct, type: 'onSubmit' }),
          value: data => data.v,
          state: data => ({ value: data.v }),
          isInvalid: data => data.invalid,
          isDirty: data => data.dirty
        },
        currency: {
          externalName: 'currency',
          handlers: d => ({
            onChange: v => d('onChange', v),
            onReset: () => d('onReset')
          }),
          submitAction: construct => ({ construct, type: 'onSubmit' }),
          resetAction: construct => ({ construct, type: 'onReset' }),
          value: data => data.c,
          state: data => ({ value: data.c }),
          isInvalid: () => false,
          isDirty: () => false
        }
      },
      resetAction: construct => ({ type: 'postReset', construct }),
      resetActions: [construct => ({ type: 'postReset2', construct })],
      submitAction: construct => ({ type: 'submit', construct }),
      submitActions: [construct => ({ type: 'submit2', construct })],
      localKeys: ['size']
    });
    dispatch = sinon.spy();
  });

  it('uses the fields handlers', () => {
    const handlers = form.handlers(dispatch);
    handlers.size.onChange('newdata');
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('uses the fields state', () => {
    const state = form.state({ v: 'test' });
    expect(state.size.value).toBe('test');
  });

  it('uses the fields invalid state', () => {
    expect(form.isInvalid({ invalid: 'notvalid' })).toMatchSnapshot();
    expect(form.isInvalid({ })).toBe(false);
  });

  it('uses the fields invalid state', () => {
    expect(form.isDirty({ dirty: 'yes' })).toBe(true);
    expect(form.isDirty({ })).toBe(false);
  });

  it('resets the form', () => {
    const handlers = form.handlers(dispatch);
    handlers.onReset();
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('uses post reset actions', () => {
    const handlers = form.handlers(dispatch);
    handlers.onReset();
    expect(dispatch.getCall(1).args).toMatchSnapshot();
    expect(dispatch.getCall(2).args).toMatchSnapshot();
  });

  it('submits the form', () => {
    const handlers = form.handlers(dispatch);
    handlers.onSubmit();
    expect(dispatch.getCall(0).args).toMatchSnapshot();
  });

  it('uses submit actions', () => {
    const handlers = form.handlers(dispatch);
    const prevent = sinon.spy();
    handlers.onSubmit({ preventDefault: prevent });
    expect(dispatch.getCall(1).args).toMatchSnapshot();
    expect(dispatch.getCall(2).args).toMatchSnapshot();
    expect(prevent.getCall(0).args).toMatchSnapshot();

    expect(dispatch.getCall(3).args).toMatchSnapshot();
    expect(dispatch.getCall(4).args).toMatchSnapshot();
  });

  it('exports data', () => {
    expect(form.export({ v: 'test', c: 'dollas' })).toMatchSnapshot();
  });
});
