const rollupPluginSvelte = require("rollup-plugin-svelte");

module.exports = {
  "extends": "@snowpack/app-scripts-svelte",
  "scripts": {
    "build:css": "postcss"
  },
  "plugins": ["@snowpack/plugin-webpack", "@snowpack/plugin-babel", "@snowpack/plugin-dotenv"],
  "proxy": {
    "/api": "https://monica.ennen.dev/api"
  },
  "installOptions": {
    rollup: {
      plugins: [
        rollupPluginSvelte({
          dev: process.env.NODE_ENV !== "production"
        })
      ]
    }
  }
}