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
      class="bg-muted rounded-3xl overflow-hidden border border-border hover:border-primary transition group"
    >
      <img
        v-if="card.image"
        :src="card.image"
        :alt="card.title"
        class="h-56 w-full object-cover group-hover:scale-105 transition"
      />
      <div class="p-4">
        <span v-if="card.date" class="text-primary text-sm font-bold">{{ card.date }}</span>
        <h4 class="font-bold text-foreground group-hover:text-primary transition">{{ card.title }}</h4>
        <p v-if="card.subtitle" class="text-xs text-muted-foreground mt-1">{{ card.subtitle }}</p>
        <a
          v-if="card.linkText"
          :href="linkHref(card.linkUrl || '#')"
          class="inline-block mt-3 text-primary text-sm font-bold border-b border-primary/30 hover:border-primary transition"
        >
          {{ card.linkText }}
        </a>
      </div>
    </div>
  </div>
</template>
