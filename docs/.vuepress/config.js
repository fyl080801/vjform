module.exports = {
  lang: "zh-CN",
  title: "Vue JSON Form",
  description: "render ui by json expression",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" }
    ]
  ],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" }
    ],
    sidebar: [
      {
        title: "基本功能",
        path: "/guide/",
        collapsable: false,
        children: ["/guide/basic/basic-demo", "/guide/basic/input"]
      }
    ],
    sidebarDepth: 0
  },
  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2] }
  },
  plugins: [
    [
      "demo-block",
      {
        settings: {
          jsLib: ["https://unpkg.com/element-ui/lib/index.js"], // js dependency in the online example (jsfiddle, codepen)
          cssLib: ["https://unpkg.com/element-ui/lib/theme-chalk/index.css"], // css dependency in the online example (jsfiddle, codepen)
          // vue: "", // vue dependency in the online example (jsfiddle, codepen)
          // react: "http://xxx", // react dependency in the online example (jsfiddle, codepen)
          // reactDOM: "http://xxx", // reactDOM dependency in the online example (jsfiddle, codepen)
          jsfiddle: false,
          codepen: false,
          horizontal: false
        }
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "right",
        defaultTitle: ""
      }
    ]
  ]
};
