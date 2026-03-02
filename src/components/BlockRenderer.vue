<script setup>
import { computed } from 'vue'
import Hero from './blocks/Hero.vue'
import Features from './blocks/Features.vue'
import Cta from './blocks/Cta.vue'
import Footer from './blocks/Footer.vue'
import Partners from './blocks/Partners.vue'
import ImageText from './blocks/ImageText.vue'
import Testimonials from './blocks/Testimonials.vue'
import Stats from './blocks/Stats.vue'
import Faq from './blocks/Faq.vue'
import FilterTabs from './blocks/FilterTabs.vue'
import CardGrid from './blocks/CardGrid.vue'
import FeaturedCard from './blocks/FeaturedCard.vue'
import ArticleContent from './blocks/ArticleContent.vue'
import ArticleMeta from './blocks/ArticleMeta.vue'
import ArticleNav from './blocks/ArticleNav.vue'

const blockComponents = {
  hero: Hero,
  features: Features,
  cta: Cta,
  footer: Footer,
  partners: Partners,
  imageText: ImageText,
  testimonials: Testimonials,
  stats: Stats,
  faq: Faq,
  filterTabs: FilterTabs,
  cardGrid: CardGrid,
  featuredCard: FeaturedCard,
  articleContent: ArticleContent,
  articleMeta: ArticleMeta,
  articleNav: ArticleNav,
}

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
  currentPagePath: {
    type: String,
    default: '/',
  },
})

const Component = computed(() => blockComponents[props.block.type] || null)
const blockStyle = computed(() => {
  const s = props.block.styles
  if (!s || typeof s !== 'object') return undefined
  return Object.fromEntries(
    Object.entries(s).map(([k, v]) => [
      k.replace(/([A-Z])/g, '-$1').toLowerCase(),
      v,
    ])
  )
})
</script>

<template>
  <div
    v-if="Component"
    class="block"
    :class="['block--' + block.type]"
    :style="blockStyle"
  >
    <Component :block="block" :base-path="basePath" :current-page-path="currentPagePath" />
  </div>
  <div v-else class="block block--unknown p-4 text-gray-500">
    <p>未知区块类型: {{ block.type }}</p>
  </div>
</template>
