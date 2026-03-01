<script setup>
import { getHref } from '../../utils/relativeHref.js'

const props = defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})

function linkHref(url) {
  return getHref(props.currentPagePath, url || '/', props.basePath)
}
</script>

<template>
  <footer class="py-6 text-center border-t border-gray-200 text-sm text-gray-600">
    <p class="mb-2">{{ block.props?.copyright ?? '© 2024' }}</p>
    <nav v-if="(block.props?.links || []).length" class="flex justify-center gap-4 flex-wrap">
      <a
        v-for="(link, i) in block.props.links"
        :key="i"
        :href="linkHref(link.url)"
        class="text-gray-600 no-underline hover:underline"
      >
        {{ link.label ?? link.url }}
      </a>
    </nav>
  </footer>
</template>
