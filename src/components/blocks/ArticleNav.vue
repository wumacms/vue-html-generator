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
  <section class="bg-zinc-950 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-6">
        <a
          v-if="block.props?.prev"
          :href="linkHref(block.props.prev.url)"
          class="bg-black border border-yellow-300/20 rounded-2xl p-5 hover:border-yellow-300 transition group"
        >
          <span class="text-gray-500 text-sm flex items-center gap-1 mb-2">← 上一篇</span>
          <h4 class="font-bold text-white text-lg group-hover:text-yellow-300">{{ block.props.prev.title }}</h4>
          <p v-if="block.props.prev.date" class="text-gray-400 text-sm">{{ block.props.prev.date }}</p>
        </a>
        <a
          v-if="block.props?.next"
          :href="linkHref(block.props.next.url)"
          class="bg-black border border-yellow-300/20 rounded-2xl p-5 hover:border-yellow-300 transition group text-right"
        >
          <span class="text-gray-500 text-sm flex items-center gap-1 mb-2 justify-end">下一篇 →</span>
          <h4 class="font-bold text-white text-lg group-hover:text-yellow-300">{{ block.props.next.title }}</h4>
          <p v-if="block.props.next.date" class="text-gray-400 text-sm">{{ block.props.next.date }}</p>
        </a>
      </div>
    </div>
  </section>
</template>
