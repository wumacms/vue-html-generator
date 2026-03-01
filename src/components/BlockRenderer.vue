<script setup>
import { computed } from 'vue'
import Hero from './blocks/Hero.vue'
import Features from './blocks/Features.vue'
import Cta from './blocks/Cta.vue'
import Footer from './blocks/Footer.vue'

const blockComponents = {
  hero: Hero,
  features: Features,
  cta: Cta,
  footer: Footer,
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
