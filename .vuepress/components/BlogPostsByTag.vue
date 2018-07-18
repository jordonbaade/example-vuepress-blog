<template>
  <RenderlessPagesList :allPages="$site.pages" :byPaths="byPaths" :notPaths="notPaths" :byTags="byTags" :byCategories="byCategories" :notTags="notTags" :notCategories="notCategories">
    <div slot-scope="{ pages, tags, formatDate, formatAnchor }">
      <template v-for="tag in tags()">
        <div v-bind:key="tag">
          <h2>
            <a :href="'#'+formatAnchor(tag)" aria-hidden="true" class="header-anchor">#</a>
            {{ tag }}
          </h2>
          <BlogPosts :byTags="tag" />
        </div>
      </template>
    </div>
  </RenderlessPagesList>
</template>

<script>
import { compact, uniq, flatMap } from "lodash"
import RenderlessPagesList from "./RenderlessPagesList"
import blogPageListProps from "./blogPageListProps.js"

export default {
  props: blogPageListProps,
  components: {
    RenderlessPagesList
  }
}
</script>
