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

import * as actions from '../../src/actions';

it('should create a change action', function () {
  expect(actions.change(
    'pizza', 'meat'
  )).toMatchSnapshot();
});

it('should create a blur action', function () {
  expect(actions.blur(
    'pizza'
  )).toMatchSnapshot();
});

it('should create a focus action', function () {
  expect(actions.focus(
    'pizza'
  )).toMatchSnapshot();
});
