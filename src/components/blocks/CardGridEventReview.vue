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
  <div class="grid md:grid-cols-3 gap-6">
    <div
      v-for="(card, i) in (block.props?.cards ?? [])"
      :key="i"
      class="bg-zinc-900 rounded-3xl overflow-hidden border border-yellow-300/20"
    >
      <img
        v-if="card.image"
        :src="card.image"
        :alt="card.title"
        class="h-56 w-full object-cover"
      />
      <div class="p-4">
        <span v-if="card.date" class="text-yellow-300 text-sm font-bold">{{ card.date }}</span>
        <h4 class="font-bold text-white">{{ card.title }}</h4>
        <p v-if="card.subtitle" class="text-xs text-gray-400 mt-1">{{ card.subtitle }}</p>
        <a
          v-if="card.linkText"
          :href="linkHref(card.linkUrl || '#')"
          class="inline-block mt-3 text-yellow-300 text-sm font-bold border-b border-yellow-300/30"
        >
          {{ card.linkText }}
        </a>
      </div>
    </div>
  </div>
</template>
