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

import isValidJson from './is.valid.json';

const makeValidator = (check, error) => value => (
  check(value) ? false : error
);

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
const uriRegex = new RegExp('^(https?:\\/\\/)?' // protocol
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
  + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
  + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
  + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
  + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

const isLength = length => value => !value || value.length === length;
const isMaxLength = max => value => !value || value.length <= max;
const isMinLength = min => value => !value || value.length >= min;
const matches = regex => value => !value || value.match && value.match(regex);
const isAlphaNum = matches(/^[a-zA-Z0-9_]*$/);
const isEmail = matches(emailRegex);
const isIP = matches(ipRegex);
const isUri = matches(uriRegex);

const isMinValue = min => value => value >= min;
const isMaxValue = max => value => value <= max;
const isGreater = min => value => value > min;
const isLess = max => value => value < max;
const isNumber = v => typeof v === 'number';
const isString = v => !v || typeof v === 'string';
const hasPrecision = p => v => `${v}` === v.toFixed(p);

export const json = makeValidator(isValidJson, 'error.string.json');
export const minLength = min => makeValidator(isMinLength(min), 'error.string.min');
export const maxLength = max => makeValidator(isMaxLength(max), 'error.string.max');
export const length = l => makeValidator(isLength(l), 'error.string.length');
export const regex = rx => makeValidator(matches(rx), 'error.string.regex');
export const alphanum = makeValidator(isAlphaNum, 'error.string.alphanum');
export const email = makeValidator(isEmail, 'error.string.email');
export const ip = makeValidator(isIP, 'error.string.ip');
export const uri = makeValidator(isUri, 'error.string.uri');
export const string = makeValidator(isString, 'error.string.base');

export const min = m => makeValidator(isMinValue(m), 'error.number.min');
export const max = m => makeValidator(isMaxValue(m), 'error.number.max');
export const greater = m => makeValidator(isGreater(m), 'error.number.greater');
export const less = m => makeValidator(isLess(m), 'error.number.less');
export const integer = makeValidator(Number.isInteger, 'error.number.integer');
export const precision = p => makeValidator(hasPrecision(p), 'error.number.precision');
export const number = makeValidator(isNumber, 'error.number.base');
