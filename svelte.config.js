const postcss = require('./postcss.config');
const sveltePreprocess = require('svelte-preprocess');

const preprocess = sveltePreprocess({
    typescript: true,
    postcss,
  });
  
  module.exports = {
    preprocess,
  };