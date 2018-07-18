export default {
  byTags: {
    default() {
      return []
    },
    type: [Array, String]
  },
  byCategories: {
    default() {
      return []
    },
    type: [Array, String]
  },
  byPaths: {
    default() {
      return ["/blog"]
    },
    type: [Array, String]
  },
  notTags: {
    default() {
      return []
    },
    type: [Array, String]
  },
  notCategories: {
    default() {
      return []
    },
    type: [Array, String]
  },
  notPaths: {
    default() {
      return ["/blog/tags/", "/blog/", "/blog/categories/"]
    },
    type: [Array, String]
  }
}
