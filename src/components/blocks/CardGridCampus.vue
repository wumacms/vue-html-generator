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
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="(card, i) in (block.props?.cards ?? [])"
      :key="i"
      class="bg-zinc-900 rounded-3xl border border-yellow-300/20 overflow-hidden hover:border-yellow-300 transition group"
    >
      <div class="h-60 overflow-hidden">
        <img
          v-if="card.image"
          :src="card.image"
          :alt="card.title"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-2xl font-bold text-white">{{ card.title }}</h3>
            <p class="text-yellow-300 text-sm">{{ card.subtitle }}</p>
          </div>
          <span
            v-if="card.badge"
            class="bg-yellow-300/20 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-300/40"
          >
            {{ card.badge }}
          </span>
        </div>
        <p v-if="card.description" class="text-gray-400 text-sm mt-3">{{ card.description }}</p>
        <div v-if="(card.tags ?? []).length" class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="(tag, j) in card.tags"
            :key="j"
            class="bg-black border border-yellow-300/30 text-gray-300 text-xs px-2 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
        <div class="flex gap-3 mt-5">
          <a
            :href="linkHref('#')"
            class="bg-yellow-300 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-200 transition"
          >
            {{ card.primaryButton ?? '预约参观' }}
          </a>
          <a
            :href="linkHref('#')"
            class="border border-yellow-300 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-300 hover:text-black transition"
          >
            {{ card.secondaryButton ?? '路线' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
