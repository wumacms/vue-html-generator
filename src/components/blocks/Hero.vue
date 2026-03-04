<script setup>
import { computed } from 'vue'
const variants = import.meta.glob('./Hero*.vue', { eager: true })
const variantComponents = Object.fromEntries(
  Object.entries(variants).map(([path, module]) => {
    const name = path.match(/\/Hero([^/]+)\.vue$/)[1]
    const key = name.charAt(0).toLowerCase() + name.slice(1)
    return [key, module.default]
  })
)

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
