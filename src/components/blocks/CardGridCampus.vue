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
      class="bg-muted rounded-3xl border border-border overflow-hidden hover:border-primary transition group"
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
            <h3 class="text-2xl font-bold text-foreground">{{ card.title }}</h3>
            <p class="text-primary text-sm">{{ card.subtitle }}</p>
          </div>
          <span
            v-if="card.badge"
            class="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full border border-primary/40"
          >
            {{ card.badge }}
          </span>
        </div>
        <p v-if="card.description" class="text-muted-foreground text-sm mt-3">{{ card.description }}</p>
        <div v-if="(card.tags ?? []).length" class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="(tag, j) in card.tags"
            :key="j"
            class="bg-background border border-border text-muted-foreground text-xs px-2 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
        <div class="flex gap-3 mt-5">
          <a
            :href="linkHref('#')"
            class="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition"
          >
            {{ card.primaryButton ?? '预约参观' }}
          </a>
          <a
            :href="linkHref('#')"
            class="border border-primary text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-primary-foreground transition"
          >
            {{ card.secondaryButton ?? '路线' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
