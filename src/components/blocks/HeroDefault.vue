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
  <section class="relative bg-gradient-to-b from-black to-zinc-900 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <span
            v-if="block.props?.badge"
            class="inline-block bg-yellow-300/10 text-yellow-300 border border-yellow-300/30 px-4 py-1.5 rounded-full text-sm font-bold"
          >
            {{ block.props.badge }}
          </span>
          <h1 class="text-5xl md:text-6xl font-black leading-tight">
            <span v-if="block.props?.titleLine1 && block.props.titleLine1 !== block.props?.titleHighlight" class="text-white">{{ block.props.titleLine1 }}</span>
            <span v-if="block.props?.titleHighlight" class="text-yellow-300">{{ block.props.titleHighlight }}</span>
            <span v-if="block.props?.titleLine2" v-html="' ' + (block.props.titleLine2 || '').replace(/\n/g, '<br>')" />
          </h1>
          <p v-if="block.props?.subtitle" class="text-xl text-gray-300 max-w-lg">
            {{ block.props.subtitle }}
          </p>
          <p v-if="block.props?.note" class="text-gray-400 text-sm">{{ block.props.note }}</p>
          <div v-if="(block.props?.buttons ?? []).length" class="flex flex-wrap gap-4 pt-4">
            <a
              v-for="(btn, i) in block.props.buttons"
              :key="i"
              :href="linkHref(btn.url)"
              :class="[
                btn.primary
                  ? 'bg-yellow-300 text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-yellow-300/40 hover:bg-yellow-200 transition'
                  : 'border-2 border-yellow-300 text-yellow-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-black transition',
              ]"
            >
              {{ btn.text }}
            </a>
          </div>
        </div>
        <div class="relative h-72 sm:h-80 md:h-96">
          <img
            v-if="block.props?.image"
            :src="basePath ? basePath.replace(/\/$/, '') + block.props.image : block.props.image"
            :alt="block.props.imageAlt || ''"
            class="w-full h-full object-cover rounded-3xl border-4 border-yellow-300/30 shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </section>
</template>
