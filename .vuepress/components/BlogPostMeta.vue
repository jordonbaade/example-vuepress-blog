<template>
  <small>
    <div v-if="$page.frontmatter.date">Published {{ formatDate($page.frontmatter.date) }}</div>
    <span v-if="$page.frontmatter.categories">
      Categorized:
      <a v-for="(category, index) in $page.frontmatter.categories" :key="index" :href="'/blog/categories/#'+formatAnchor(category)">
        {{category}}
      </a>
    </span>
    <span v-if="$page.frontmatter.tags">
      Tagged:
      <a v-for="(tag, index) in $page.frontmatter.tags" :key="index" :href="'/blog/tags/#'+formatAnchor(tag)">
        {{tag}}
      </a>
    </span>
  </small>
</template>

<script>
import { format, toDate } from "date-fns"
export default {
  methods: {
    toDate,
    formatDate(date) {
      return format(toDate(date), 'Pp')
    },
    formatAnchor(string) {
      return string.toLowerCase().replace(/ /g, "-")
    }
  }
}
</script>
