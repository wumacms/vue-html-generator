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
  <section class="bg-black pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-zinc-900 rounded-3xl border-2 border-yellow-300/30 overflow-hidden mb-8 hover:border-yellow-300 transition">
        <div class="grid md:grid-cols-2">
          <div class="h-80 md:h-auto overflow-hidden">
            <img
              v-if="block.props?.image"
              :src="block.props.image"
              :alt="block.props.imageAlt || block.props?.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-8 flex flex-col justify-center">
            <div v-if="block.props?.badge || block.props?.date" class="flex gap-2 items-center mb-3">
              <span
                v-if="block.props?.badge"
                class="text-yellow-300 bg-black border border-yellow-300 px-3 py-1 rounded-full text-xs font-bold inline-block w-fit"
              >
                {{ block.props.badge }}
              </span>
              <span v-if="block.props?.date" class="text-gray-400 text-sm">{{ block.props.date }}</span>
            </div>
            <h3 class="text-3xl font-black text-white mb-3">{{ block.props?.title ?? '' }}</h3>
            <p class="text-gray-300 mb-4">{{ block.props?.description ?? '' }}</p>
            <div v-if="(block.props?.meta ?? []).length" class="flex gap-4 text-sm text-gray-400 mb-5">
              <span v-for="(m, i) in block.props.meta" :key="i">{{ m }}</span>
            </div>
            <div v-if="(block.props?.buttons ?? []).length" class="flex gap-3">
              <a
                v-for="(btn, i) in block.props.buttons"
                :key="i"
                :href="linkHref(btn.url)"
                :class="[
                  btn.primary
                    ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                    : 'border border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black',
                  'px-6 py-3 rounded-full font-bold text-sm transition',
                ]"
              >
                {{ btn.text }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
