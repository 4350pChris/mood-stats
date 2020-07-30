const postcss = require('./postcss.config');
const sveltePreprocess = require('svelte-preprocess');

const preprocess = sveltePreprocess({
    typescript: true,
    postcss: {
      plugins: postcss.plugins
    },
  });
  
  module.exports = {
    preprocess,
  };