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
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <div
      v-for="(card, i) in (block.props?.cards ?? [])"
      :key="i"
      class="bg-black p-5 rounded-2xl border border-yellow-300/20 hover:border-yellow-300 transition"
    >
      <div class="flex justify-between items-start">
        <span
          v-if="card.badge"
          class="bg-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full"
        >
          {{ card.badge }}
        </span>
        <span v-if="card.meta" class="text-yellow-300 text-sm">{{ card.meta }}</span>
      </div>
      <h3 class="font-bold text-white text-lg mt-3">{{ card.title }}</h3>
      <p v-if="card.subtitle" class="text-sm text-gray-400">{{ card.subtitle }}</p>
      <p v-if="card.note" class="text-xs text-gray-500 mt-2">{{ card.note }}</p>
      <a
        v-if="card.linkText"
        :href="linkHref('#')"
        class="inline-block mt-3 text-yellow-300 text-sm font-bold border-b border-yellow-300/30"
      >
        {{ card.linkText }}
      </a>
    </div>
  </div>
</template>
