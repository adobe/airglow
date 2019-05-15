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

import * as R from 'ramda';

const autocorrectClipping = max => value =>
  ((max != null) ? value.substring(0, max) : value);


const autocorrectTrim = R.curry(
  // we only want to trim when we are blurring, otherwise the user can never type a space
  (when, value) => (value && when === 'enabled' ? R.trim(value) : value)
);

const autocorrectLower = R.toLower;
const autocorrectRestrictSpace = R.replace(/ /g, '');

const text = (
  { max, autotrim = true, autolower, autorestrictSpace },
  value,
  when
) =>
  R.pipe(
    max ? autocorrectClipping(max) : R.identity,
    autotrim ? autocorrectTrim(when) : R.identity,
    autolower ? autocorrectLower : R.identity,
    autorestrictSpace ? autocorrectRestrictSpace : R.identity
  )(value);

const number = (
  { min, max, greater, less, integer, precision, step = 1 },
  value
) => {
  let corrected = value;

  if (integer) {
    corrected = Math.round(corrected);
  }
  if (precision) {
    const mult = 10 ** precision;
    corrected = Math.round(corrected * mult) / mult;
  }
  if (corrected < min) { corrected = min; }
  if (corrected > max) { corrected = max; }
  if (corrected <= greater) { corrected = greater + step; }
  if (corrected >= less) { corrected = less - step; }
  return corrected;
};

const map = { text, number };

const normalizeValue = (value) => {
  if (!value) { return value; }
  if (value.target) { return value.target.value; }
  return value;
};

const shouldAutoCorrect = (config, now) =>
  config === now || now === 'enabled';

export default (state, when, value) => {
  const { construct } = state;
  const { fieldType, autocorrect, customAutocorrect = R.identity } = construct;
  let useValue = normalizeValue(value);

  if (!shouldAutoCorrect(autocorrect, when)) { return useValue; }
  useValue = customAutocorrect(useValue);
  return (map[fieldType] ? map[fieldType](construct, useValue, when) : useValue);
};
