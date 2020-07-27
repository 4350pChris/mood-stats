const plugins = require('./postcss.config');
const sveltePreprocess = require('svelte-preprocess');

const preprocess = sveltePreprocess({
    typescript: true,
    postcss: {
      plugins: plugins.plugins
    },
  });
  
  module.exports = {
    preprocess,
  };