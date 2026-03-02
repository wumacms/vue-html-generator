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
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="(card, i) in (block.props?.cards ?? [])"
      :key="i"
      class="bg-black p-5 rounded-2xl border border-yellow-300/20 hover:border-yellow-300 transition"
    >
      <span
        v-if="card.badge"
        class="bg-yellow-300/20 text-yellow-300 text-xs px-2 py-1 rounded-full inline-block mb-3"
      >
        {{ card.badge }}
      </span>
      <h3 class="font-bold text-white text-lg mb-2">{{ card.title }}</h3>
      <p v-if="card.subtitle" class="text-sm text-gray-400 mb-3">{{ card.subtitle }}</p>
      <div class="flex justify-between items-center">
        <span v-if="card.date" class="text-gray-500 text-xs">{{ card.date }}</span>
        <a
          v-if="card.linkText"
          :href="linkHref(card.link)"
          class="text-yellow-300 text-sm font-bold border-b border-yellow-300/30"
        >
          {{ card.linkText }}
        </a>
      </div>
    </div>
  </div>
</template>
