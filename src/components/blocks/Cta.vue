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
  <section class="bg-yellow-300 py-20">
    <div class="max-w-3xl mx-auto text-center px-4">
      <span
        v-if="block.props?.badge"
        class="text-black bg-white/30 px-3 py-1 rounded-full text-sm font-bold"
      >
        {{ block.props.badge }}
      </span>
      <h2 v-if="block.props?.title" class="text-4xl md:text-5xl font-black text-black mb-4" :class="{ 'mt-6': block.props?.badge }">
        {{ block.props.title }}
      </h2>
      <p v-if="block.props?.text" class="text-lg text-black/80 mb-8">{{ block.props.text }}</p>
      <div v-if="(block.props?.buttons ?? []).length" class="flex flex-wrap gap-4 justify-center">
        <a
          v-for="(btn, i) in block.props.buttons"
          :key="i"
          :href="linkHref(btn.url)"
          :class="[
            btn.primary
              ? 'bg-black text-yellow-300 px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:bg-zinc-900 transition'
              : 'bg-transparent border-4 border-black text-black px-10 py-4 rounded-full font-bold text-xl hover:bg-black hover:text-yellow-300 transition',
          ]"
        >
          {{ btn.text }}
        </a>
      </div>
      <p v-if="block.props?.footerNote" class="text-sm text-black/60 mt-6">{{ block.props.footerNote }}</p>
    </div>
  </section>
</template>
