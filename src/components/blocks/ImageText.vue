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

const reverse = () => !!props.block.props?.reverse
</script>

<template>
  <section :class="[reverse() ? 'bg-zinc-950' : 'bg-black', 'py-20']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col gap-12 items-center"
        :class="reverse() ? 'md:flex-row-reverse' : 'md:flex-row'"
      >
        <div class="md:w-1/2 w-full">
          <img
            v-if="block.props?.image"
            :src="block.props.image"
            :alt="block.props.imageAlt || ''"
            class="rounded-3xl border-4 border-yellow-300/40 shadow-2xl w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <div class="md:w-1/2 space-y-5">
          <span
            v-if="block.props?.badge"
            class="text-yellow-300 font-bold text-sm bg-black border border-yellow-300 px-4 py-1.5 rounded-full inline-block"
          >
            {{ block.props.badge }}
          </span>
          <h2 class="text-4xl font-black text-yellow-300">{{ block.props?.title ?? '' }}</h2>
          <p class="text-gray-300 text-lg">{{ block.props?.description ?? '' }}</p>
          <div v-if="(block.props?.tags ?? []).length" class="flex flex-wrap gap-2 pt-2">
            <span
              v-for="(tag, i) in block.props.tags"
              :key="i"
              class="bg-yellow-300/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold border border-yellow-300"
            >
              {{ tag }}
            </span>
          </div>
          <div v-if="(block.props?.buttons ?? []).length" class="flex flex-wrap gap-3 pt-4">
            <a
              v-for="(btn, i) in block.props.buttons"
              :key="i"
              :href="linkHref(btn.url)"
              :class="[
                btn.primary
                  ? 'bg-yellow-300 text-black hover:bg-yellow-200'
                  : 'border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black',
                'px-8 py-3 rounded-full font-bold inline-block transition shadow-xl',
              ]"
            >
              {{ btn.text }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
