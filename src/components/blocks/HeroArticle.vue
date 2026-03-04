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
  <section class="relative py-24 md:py-32 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        v-if="block.props?.image"
        :src="block.props.image"
        :alt="block.props.imageAlt || ''"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
    </div>
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="(block.props?.breadcrumb ?? []).length" class="text-sm text-foreground/80 mb-4">
        <template v-for="(item, i) in block.props.breadcrumb" :key="i">
          <a
            v-if="item.url"
            :href="linkHref(item.url)"
            class="hover:text-primary transition"
          >{{ item.label }}</a>
          <span v-else class="text-primary">{{ item.label }}</span>
          <span v-if="i < block.props.breadcrumb.length - 1" class="mx-2 text-muted-foreground/40">/</span>
        </template>
      </div>
      <div v-if="block.props?.badge || block.props?.date" class="flex gap-3 items-center mb-4">
        <span
          v-if="block.props?.badge"
          class="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-bold"
        >
          {{ block.props.badge }}
        </span>
        <span v-if="block.props?.date" class="text-foreground/70 text-sm">{{ block.props.date }}</span>
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight drop-shadow-lg">
        {{ block.props?.title ?? '' }}
      </h1>
      <div v-if="(block.props?.meta ?? []).length" class="flex items-center gap-4 mt-6 text-foreground/80">
        <span v-for="(m, i) in block.props.meta" :key="i">{{ m }}</span>
      </div>
    </div>
  </section>
</template>
