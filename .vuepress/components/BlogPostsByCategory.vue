<template>
  <RenderlessPagesList :byPaths="byPaths" :notPaths="notPaths" :byTags="byTags" :byCategories="byCategories" :notTags="notTags" :notCategories="notCategories">
    <div slot-scope="{ pages, categories, formatDate, formatAnchor }">
      <div v-for="category in categories()" :key="category">
        <h2>
          <a :href="'#'+formatAnchor(category)" aria-hidden="true" class="header-anchor">#</a>
          {{ category }}
        </h2>
        <BlogPosts :byCategories="category" />
      </div>
    </div>
  </RenderlessPagesList>
</template>

<script>
import { compact, uniq, flatMap } from "lodash"
import RenderlessPagesList from "./RenderlessPagesList"
import blogPageListProps from "./blogPageListProps"
export default {
  props: blogPageListProps,
  components: {
    RenderlessPagesList
  }
}
</script>
