/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    "@qarn/eslint-config/base",
    "@qarn/eslint-config/nextjs",
    "@qarn/eslint-config/react",
  ],
};

module.exports = config;
