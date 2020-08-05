const rollupPluginSvelte = require("rollup-plugin-svelte");

module.exports = {
  extends: "@snowpack/app-scripts-svelte",
  scripts: {
    "build:css": "postcss",
    "run:ts,tsx": 'tsc --noEmit',
    "run:ts,tsx::watch": '$1 --watch',
    "run:svelte": "svelte-check"
  },
  plugins: [
    "@snowpack/plugin-webpack",
    "@snowpack/plugin-babel",
    "@snowpack/plugin-dotenv"
  ],
  proxy: {
    "/api": "https://monica.ennen.dev/api"
  },
  installOptions: {
    installTypes: true,
    rollup: {
      plugins: [
        rollupPluginSvelte({
          dev: process.env.NODE_ENV !== "production"
        })
      ]
    }
  }
}