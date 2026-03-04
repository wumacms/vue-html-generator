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
      class="bg-muted p-5 rounded-2xl border border-border hover:border-primary transition"
    >
      <span
        v-if="card.badge"
        class="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full inline-block mb-3"
      >
        {{ card.badge }}
      </span>
      <h3 class="font-bold text-foreground text-lg mb-2">{{ card.title }}</h3>
      <p v-if="card.subtitle" class="text-sm text-muted-foreground mb-3">{{ card.subtitle }}</p>
      <div class="flex justify-between items-center">
        <span v-if="card.date" class="text-muted-foreground/60 text-xs">{{ card.date }}</span>
        <a
          v-if="card.linkText"
          :href="linkHref(card.link)"
          class="text-primary text-sm font-bold border-b border-primary/30 hover:border-primary transition"
        >
          {{ card.linkText }}
        </a>
      </div>
    </div>
  </div>
</template>
