<script setup>
import { getHref } from '../../utils/relativeHref.js'

const props = defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})

function linkHref(url) {
  return getHref(props.currentPagePath, url || '#', props.basePath)
}
</script>

<template>
  <section class="bg-black py-12 border-y border-yellow-300/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-center gap-3 text-sm">
        <span v-if="block.props?.label" class="text-yellow-300 font-bold mr-2">{{ block.props.label }}</span>
        <a
          v-for="(tab, i) in (block.props?.tabs ?? [])"
          :key="i"
          :href="linkHref(tab.path)"
          class="bg-zinc-900 border border-yellow-300/30 text-gray-300 px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
        >
          {{ tab.label }}
        </a>
      </div>
    </div>
  </section>
</template>
