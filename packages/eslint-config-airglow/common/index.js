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

module.exports = {
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true
  },
  globals: {
    sinon: true,
    jsdom: true
  },
  rules: {
    // ams specific
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'minimum'
      }
    ],
    'no-multi-spaces': ['error', {
      exceptions: {
        Property: true,
        VariableDeclarator: true
      }
    }],
    'import/extensions': ['error', { js: 'never' }],
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'no-nested-ternary': 0,

    // from react-coral project
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/imports/first': 0,

    'class-methods-use-this': 0,
    'comma-dangle': ['error', 'never'],
    'new-cap': ['error', { properties: false }],
    'no-plusplus': 0,
    'no-use-before-define': 0,

    // removed since mocha tests don't work with arrows
    // and I don't want to name every one
    'func-names': 0

    // removed from react-coral
    // 'no-param-reassign': 0,
    // 'no-mixed-operators': 0,
    //
    // 'template-curly-spacing': ['error', 'always'],
    // 'arrow-parens': 0,
    // 'arrow-body-style': 0,
  }
};
