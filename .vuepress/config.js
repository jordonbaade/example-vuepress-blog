let blogSideBarPaths = ["/blog/", "/blog/categories/", "/blog/tags/"]
module.exports = {
  title: "Example VuePress Blog",
  themeConfig: {
    nav: [{ text: "Blog", link: "/blog/" }],
    sidebar: {
      "/blog/": blogSideBarPaths,
      "/blog/tags/": blogSideBarPaths,
      "/blog/categories/": blogSideBarPaths,
      // fallback
      "/": []
    }
  }
}
