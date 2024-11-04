const config = require('@tresdoce-nestjs-toolkit/commons');
module.exports = {
  ...config.eslintConfig(),
  rules: {
    ...config.eslintConfig().rules,
    '@typescript-eslint/no-require-imports': 'off',
  },
};
