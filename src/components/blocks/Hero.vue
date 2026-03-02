<script setup>
import { computed } from 'vue'
import HeroArticle from './HeroArticle.vue'
import HeroCover from './HeroCover.vue'
import HeroDefault from './HeroDefault.vue'

const variantComponents = {
  article: HeroArticle,
  cover: HeroCover,
  default: HeroDefault,
}

const props = defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})

const HeroComponent = computed(() => {
  const v = props.block.props?.variant || 'default'
  return variantComponents[v] ?? HeroDefault
})
</script>

<template>
  <component
    :is="HeroComponent"
    :block="block"
    :base-path="basePath"
    :current-page-path="currentPagePath"
  />
</template>
