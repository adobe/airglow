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


import { call } from '@airglow/reducers';
import * as T from '../actions';

import {
  turnOnReducer, turnOffReducer, toggleReducer
} from './toggle.reducers';

import {
  valueReducer, resetReducer
} from './value.reducers';

import {
  listReducer, addToListReducer, removeFromListReducer, removeAtIndexReducer
} from './list.reducers';


export const reduceToggle = call(
  call(turnOnReducer).for(T.TOGGLE_ON),
  call(turnOffReducer).for(T.TOGGLE_OFF),
  call(toggleReducer).for(T.TOGGLE_SWITCH)
);

export const reduceValue = call(
  call(valueReducer).for(T.VALUE),
  call(resetReducer).for(T.VALUE_RESET)
);

export const reduceList = call(
  call(listReducer).for(T.LIST_SET),
  call(addToListReducer).for(T.LIST_ADD),
  call(removeFromListReducer).for(T.LIST_REMOVE),
  call(removeAtIndexReducer).for(T.LIST_REMOVE_AT)
);
