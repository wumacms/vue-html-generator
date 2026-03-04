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
  <section class="bg-background py-12 border-b border-border">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-6">
        <a
          v-if="block.props?.prev"
          :href="linkHref(block.props.prev.url)"
          class="bg-muted border border-border rounded-2xl p-5 hover:border-primary transition group"
        >
          <span class="text-muted-foreground text-sm flex items-center gap-1 mb-2">← 上一篇</span>
          <h4 class="font-bold text-foreground text-lg group-hover:text-primary">{{ block.props.prev.title }}</h4>
          <p v-if="block.props.prev.date" class="text-muted-foreground/60 text-sm">{{ block.props.prev.date }}</p>
        </a>
        <a
          v-if="block.props?.next"
          :href="linkHref(block.props.next.url)"
          class="bg-muted border border-border rounded-2xl p-5 hover:border-primary transition group text-right"
        >
          <span class="text-muted-foreground text-sm flex items-center gap-1 mb-2 justify-end">下一篇 →</span>
          <h4 class="font-bold text-foreground text-lg group-hover:text-primary">{{ block.props.next.title }}</h4>
          <p v-if="block.props.next.date" class="text-muted-foreground/60 text-sm">{{ block.props.next.date }}</p>
        </a>
      </div>
    </div>
  </section>
</template>
