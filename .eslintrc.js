module.exports = {
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'project': './tsconfig.json',
        'tsconfigRootDir': './',
    },
    'env': {
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    // 'globals': {
    //     'Atomics': 'readonly',
    //     'SharedArrayBuffer': 'readonly'
    // },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            'vars': 'all',
            'args': 'after-used',
            'ignoreRestSiblings': false,
          },
        ],
    },
    'overrides': [
      {
        'files': ['./src/handlers/web-handler/*'],
        'excludedFiles': 'shims-*.d.ts',
      },
    ],
};
