const { version } = require("./package/package.json")
/** @type {import('bili').Config} */
module.exports = {
  banner: `
/**
 * k-pop
 * version: ${version},
 * (c) Christian Kienle, ${new Date().getFullYear()}
 * LICENCE: MIT
 * http://github.com/christiankienle/k-pop
*/`,

  plugins: {
    vue: true,
  },
  globals: {
    vue: "Vue",
  },
}