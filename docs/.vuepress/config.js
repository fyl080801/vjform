module.exports = {
  locales: {
    "/": {
      lang: "zh-CN", // 将会被设置为 <html> 的 lang 属性
      title: "JForm",
      description: "ssss"
    },
    "/en-us/": {
      lang: "en-US",
      title: "JForm",
      description: ""
    }
  },
  themeConfig: {
    locales: {
      "/": {
        selectText: "选择语言",
        label: "简体中文",
        nav: [
          { text: "首页", link: "/" },
          { text: "指南", link: "/guide/" }
        ],
        sidebar: [
          {
            title: "目录",
            collapsable: false
          },
          {
            title: "基础",
            collapsable: false,
            children: []
          }
        ]
      },
      "/en-us/": {
        selectText: "Language",
        label: "English",
        nav: [
          { text: "Home", link: "/en-us/" },
          { text: "Guide", link: "/en-us/guide/" }
        ],
        sidebar: [
          {
            title: "dir",
            collapsable: false
          }
        ]
      }
    },
    sidebarDepth: 1
  }
};
