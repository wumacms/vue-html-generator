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
  <section class="bg-primary py-20 border-y border-border">
    <div class="max-w-3xl mx-auto text-center px-4">
      <div>
        <span
          v-if="block.props?.badge"
          class="text-primary-foreground bg-foreground/20 px-3 py-1 rounded-full text-sm font-bold"
        >
          {{ block.props.badge }}
        </span>
        <h2
          v-if="block.props?.title"
          class="text-4xl md:text-5xl font-black text-primary-foreground mb-4 mt-6"
        >
          {{ block.props.title }}
        </h2>
        <p
          v-if="block.props?.text"
          class="text-lg text-primary-foreground/80 mb-8"
        >
          {{ block.props.text }}
        </p>
      </div>
      <!-- 按钮组 -->
      <div
        v-if="(block.props?.buttons ?? []).length"
        class="flex flex-wrap gap-4 justify-center"
      >
        <a
          v-for="(btn, i) in block.props.buttons"
          :key="i"
          :href="linkHref(btn.url)"
          :class="[
            btn.primary
              ? 'bg-primary-foreground text-primary px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:opacity-90 transition'
              : 'border-4 border-primary-foreground text-primary-foreground px-10 py-4 rounded-full font-bold text-xl hover:bg-primary-foreground hover:text-primary transition',
          ]"
        >
          {{ btn.text }}
        </a>
      </div>
      <p v-if="block.props?.footerNote" class="text-sm text-primary-foreground/60 mt-6">{{ block.props.footerNote }}</p>
    </div>
  </section>
</template>
