const Path = require("path");
const sharedComponentsBase = Path.resolve(process.cwd(), "components");

module.exports = {
  extendPageData($page) {
    $page.lib = "k-pop"
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        vue$: "vue/dist/vue.esm.js"
      }
    },
  },
  title: "k-pop",
  base: "/k-pop/",
  plugins: [
    ["container", {
      type: "example",
      before: info => `<div class="example__rendered"><demo-${info} /></div>`,
      after: ''
    }],
    [
      "@vuepress/register-components", {
        componentsDir: sharedComponentsBase,
    }],
    "@vuepress/active-header-links",
    "@vuepress/clean-urls"],
  head: [
    ["link", {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"}],
    ["link", {rel: "shortcut-icon", type: "image/x-icon", href: "/favicon.ico"}],
    ["link", {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"}],
    ["link", {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"}],
    ["link", {rel: "manifest", href: "/site.webmanifest"}],
    ["link", {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5"}],
    ["meta", {name: "msapplication-TileColor", content: "#da532c"}],
    ["meta", {name: "theme-color", content: "#ffffff"}],
  ],
  themeConfig: {
    search: false,
    displayAllHeaders: true,
    nav: [
      {text: "Home", link: "/"},
      {text: "Guide", link: "/guide/"},
      {text: "Examples", link: "/examples/"},
      {text: "API", link: "/api/"},
      {text: "Playground", link: "/playground.md"}
    ],
    repo: "christiankienle/k-pop",
    repoLabel: "Contribute!",
    docsDir: "docs",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "Help us improve this page!"
  }
}
