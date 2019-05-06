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

import { path, defaultTo, curry } from 'ramda';
import { turnOn, turnOff, toggle } from '../actions';

const isOpen = curry(
  (name, state) => defaultTo(
    !!path(['prefab', name, 'construct', 'defaultValue'], state),
    path(['prefab', name, 'store', 'open'], state)
  )
);

const isClosed = curry((name, state) => !isOpen(name, state));

const doOpen = name =>
  dispatch => dispatch(turnOn(name));

const doClose = name =>
  dispatch => dispatch(turnOff(name));

const doToggle = name =>
  dispatch => dispatch(toggle(name));

export default function toggleSelector(name) {
  return {
    isOpen: isOpen(name),
    isClosed: isClosed(name),
    isOn: isOpen(name),
    isOff: isClosed(name),
    isSet: isOpen(name),
    isNotSet: isClosed(name),
    isVisible: isOpen(name),
    isHidden: isClosed(name),

    doOpen: doOpen(name),
    doClose: doClose(name),
    doTurnOn: doOpen(name),
    doTurnOff: doClose(name),
    doSet: doOpen(name),
    doUnset: doClose(name),
    doShow: doOpen(name),
    doHide: doClose(name),
    doToggle: doToggle(name),

    openAction: turnOn(name),
    closeAction: turnOff(name),
    turnOnAction: turnOn(name),
    turnOffAction: turnOff(name),
    setAction: turnOn(name),
    unsetAction: turnOff(name),
    showAction: turnOn(name),
    hideAction: turnOff(name),
    toggleAction: toggle(name)
  };
}
