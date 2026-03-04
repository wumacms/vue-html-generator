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
      class="bg-muted p-5 rounded-2xl border border-border hover:border-primary transition"
    >
      <div class="flex justify-between items-start">
        <span
          v-if="card.badge"
          class="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full"
        >
          {{ card.badge }}
        </span>
        <span v-if="card.meta" class="text-primary text-sm">{{ card.meta }}</span>
      </div>
      <h3 class="font-bold text-foreground text-lg mt-3">{{ card.title }}</h3>
      <p v-if="card.subtitle" class="text-sm text-muted-foreground">{{ card.subtitle }}</p>
      <p v-if="card.note" class="text-xs text-muted-foreground/60 mt-2">{{ card.note }}</p>
      <a
        v-if="card.linkText"
        :href="linkHref('#')"
        class="inline-block mt-3 text-primary text-sm font-bold border-b border-primary/30 hover:border-primary transition"
      >
        {{ card.linkText }}
      </a>
    </div>
  </div>
</template>
