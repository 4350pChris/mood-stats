const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssimport = require('postcss-import')({ path: 'src/styles' });
const nesting = require('postcss-nested');

const plugins = [postcssimport, tailwind, nesting, autoprefixer];

if (process.env.NODE_ENV === 'production') {
  plugins.push(cssnano);
}

module.exports = { plugins };
