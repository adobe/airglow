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

import * as A from '../../src/actions';

it('should create a toggle action', function () {
  expect(A.doToggleMode('myMap')()).toMatchSnapshot();
});

it('should create a zoom action', function () {
  expect(A.doZoom('myMap')({ zoom: 3 })).toMatchSnapshot();
});

it('should create a button zoom action', function () {
  expect(A.doButtonZoom('myMap', { size: -1 })).toMatchSnapshot();
});

it('should create a position action', function () {
  expect(A.doChangePosition('myMap')({ latitide: 3, longitude: -5 })).toMatchSnapshot();
});
