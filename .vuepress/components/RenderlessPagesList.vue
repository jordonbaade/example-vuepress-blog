<script>
import {
  compact,
  flatMap,
  uniq,
  each,
  get,
  filter,
  some,
  includes,
  sortBy
} from "lodash"
import { format, toDate } from "date-fns"
export default {
  props: {
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
        return []
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
        return []
      },
      type: [Array, String]
    }
  },
  computed: {
    filteredPages() {
      this.filterPages()
      return this.pages
    }
  },
  data() {
    return {
      pages: []
    }
  },
  mounted() {
  },
  methods: {
    filterPages() {
      this.setPages()
      this.filterOutByPaths()
      this.filterByPaths()
      this.filterByCategories()
      this.filterByTags()
      this.filterOutByCategories()
      this.filterOutByTags()
      this.sortByMostRecent()
    },
    filterByTags() {
      this.filterIncludes("byTags", "frontmatter.tags")
    },
    filterByCategories() {
      this.filterIncludes("byCategories", "frontmatter.categories")
    },
    filterByPaths() {
      this.filterStartsWith("byPaths", "path")
    },
    filterOutByTags() {
      this.filterIncludes("notTags", "frontmatter.tags", true)
    },
    filterOutByCategories() {
      this.filterIncludes("notCategories", "frontmatter.categories", true)
    },
    filterOutByPaths() {
      this.filterIsNot("notPaths", "path")
    },
    setPages() {
      this.pages = this.$site.pages
    },
    filterIncludes(byWhat, byKey, exclude = false) {
      if (!get(this, byWhat).length) return

      let self = this

      this.pages = filter(this.pages, function(page) {
        let yesNo = some(get(page, byKey), pageKeyValue =>
          includes(get(self, byWhat), pageKeyValue)
        )
        return !exclude ? yesNo : !yesNo
      })
    },
    filterStartsWith(byWhat, byKey) {
      if (!get(this, byWhat).length) return

      let self = this

      this.pages = filter(this.pages, function(page) {
        let pageKeyValues = get(self, byWhat)
        if (typeof pageKeyValues === "string") {
          pageKeyValues = [pageKeyValues]
        }
        let yesNos = []
        each(pageKeyValues, value =>
          yesNos.push(get(page, byKey).startsWith(value))
        )
        return some(yesNos)
      })
    },
    filterIsNot(byWhat, byKey) {
      if (!get(this, byWhat).length) return

      let self = this

      this.pages = filter(this.pages, function(page) {
        let pageKeyValues = get(self, byWhat)
        if (typeof pageKeyValues === "string") {
          pageKeyValues = [pageKeyValues]
        }
        let yesNos = []
        each(pageKeyValues, value => yesNos.push(get(page, byKey) === value))
        return !some(yesNos)
      })
    },
    sortByMostRecent() {
      this.pages = sortBy(this.pages, [(page) => { return format(toDate(page.frontmatter.date), 'S'); }]).reverse()
    },
    categories() {
      return compact(uniq(flatMap(this.pages, "frontmatter.categories"))).sort()
    },
    tags() {
      return compact(uniq(flatMap(this.pages, "frontmatter.tags"))).sort()
    },
    formatAnchor(string) {
      return string.toLowerCase().replace(/ /g, "-")
    },
    formatDate(date) {
      return format(toDate(date), 'P')
    }
  },
  render() {
    return this.$scopedSlots.default({
      pages: this.filteredPages,
      tags: this.tags,
      categories: this.categories,
      formatDate: this.formatDate,
      formatAnchor: this.formatAnchor
    })
  }
}
</script>
