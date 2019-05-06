module.exports = {
  extends: [
    'airbnb',
    './common/index.js'
  ],
  parser: 'babel-eslint',
  rules: {

    // from react-coral project
    'react/jsx-filename-extension': 0,
    'react/jsx-pascal-case': [2, { ignore: ['TR', 'TH', 'TD'] }],
    'react/prop-types': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/tabindex-no-positive': 0,

    // add externals to ignore
    'import/no-unresolved':  ['error', {
      ignore: [
        '^react$',
        '^react-redux$',
        '^react-dom$'
      ]
    }],

    // new rules to maybe implement one day
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y/anchor-is-valid': 0

    // Ignored from react-coral project
    // 'react/display-name': [2, { ignoreTranspilerName: true }],
    // 'react/jsx-curly-spacing': [2, 'always'],
    // 'react/jsx-indent': 0,
    // 'react/jsx-no-bind': 0,
    // 'react/no-string-refs': 0
  }
};
