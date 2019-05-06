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

import { assoc } from 'ramda';
import reducer from '../../../src/reducers/construct.reducer';

const action = {
  type: 'ACTION!',
  payload: { construct: 'squid' }
};
const passThrough = { pass: 'me' };

describe('ConstructReducer', () => {
  it('should call the reducer on the matching constructs', function () {
    const squidSpy = sinon.spy();
    const eelSpy = sinon.spy();

    reducer({
      squid: {
        construct: { reduce: squidSpy },
        store: {}
      },
      eel: {
        construct: { reduce: eelSpy },
        store: {}
      }
    }, action, passThrough);

    expect(eelSpy.called).toBe(false);
    expect(squidSpy.lastCall.args).toMatchSnapshot();
  });
  it('should properly build the state', function () {
    const squidSpy = sinon.stub().callsFake((state, called) =>
      assoc(['store'], {
        called: called.type,
        count: state.store.count + 1
      }, state));

    expect(reducer({
      squid: {
        construct: { reduce: squidSpy },
        store: { count: 1 }
      }
    }, action)).toMatchSnapshot();
  });
  it('should return the state if there aint no reducer', function () {
    expect(reducer({
      squid: 'happy'
    }, action)).toMatchSnapshot();
  });
});
