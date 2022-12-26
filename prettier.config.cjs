/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  semi: true,
  bracketSpacing: true,
  bracketSameLine: false,
  printWidth: 80,
};
