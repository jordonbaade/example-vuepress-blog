<template>
  <RenderlessPagesList :allPages="$site.pages" :byPaths="byPaths" :notPaths="notPaths" :byTags="byTags" :byCategories="byCategories" :notTags="notTags" :notCategories="notCategories">
    <div slot-scope="{ pages, formatDate }">
      <template v-for="page in pages">
        <div v-bind:key="page.path">
          <small class="text-grey">
            {{ formatDate(page.frontmatter.date) }} &bull;
          </small>
          <a :href="page.path">{{ page.title }}</a><br/>
        </div>
      </template>
    </div>
  </RenderlessPagesList>
</template>

<script>
import RenderlessPagesList from "./RenderlessPagesList"
import blogPageListProps from "./blogPageListProps"
export default {
  props: blogPageListProps,
  components: {
    RenderlessPagesList
  }
}
</script>
