<script setup>
import { computed } from 'vue'
const blocks = import.meta.glob('./blocks/*.vue', { eager: true })
const blockComponents = Object.fromEntries(
  Object.entries(blocks).map(([path, module]) => {
    const name = path.match(/\/([^/]+)\.vue$/)[1]
    const key = name.charAt(0).toLowerCase() + name.slice(1)
    return [key, module.default]
  })
)

// 别名保留
if (blockComponents.eventHotSection) {
  blockComponents.newsHotSection = blockComponents.eventHotSection
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
