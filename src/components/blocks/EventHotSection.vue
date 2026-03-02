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

const title = () => props.block.props?.title ?? ''
const linkText = () => props.block.props?.linkText ?? ''
const linkUrl = () => props.block.props?.linkUrl ?? '#'
const featured = () => props.block.props?.featured ?? {}
const secondaryCards = () => props.block.props?.secondaryCards ?? []
</script>

<template>
  <section class="bg-black pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-10">
        <h2 class="text-3xl md:text-4xl font-black text-yellow-300">{{ title() }}</h2>
        <a
          v-if="linkText()"
          :href="linkHref(linkUrl())"
          class="text-yellow-300 border-b border-yellow-300/30 pb-0.5 text-sm font-bold hover:text-white transition"
        >
          {{ linkText() }}
        </a>
      </div>
      <!-- 大卡片 -->
      <div
        v-if="featured().image || featured().title"
        class="bg-zinc-900 rounded-3xl border-2 border-yellow-300/30 overflow-hidden mb-8 hover:border-yellow-300 transition"
      >
        <div class="grid md:grid-cols-2">
          <div class="h-80 md:h-auto overflow-hidden">
            <img
              v-if="featured().image"
              :src="featured().image"
              :alt="featured().imageAlt || featured().title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-8 flex flex-col justify-center">
            <span
              v-if="featured().badge"
              class="text-yellow-300 bg-black border border-yellow-300 px-3 py-1 rounded-full text-xs font-bold inline-block w-fit mb-4"
            >
              {{ featured().badge }}
            </span>
            <h3 class="text-3xl font-black text-white mb-3">{{ featured().title }}</h3>
            <p class="text-gray-300 mb-4">{{ featured().description }}</p>
            <div v-if="(featured().meta ?? []).length" class="flex gap-4 text-sm text-gray-400 mb-5">
              <span v-for="(m, i) in featured().meta" :key="i">{{ m }}</span>
            </div>
            <div v-if="(featured().buttons ?? []).length" class="flex gap-3">
              <a
                v-for="(btn, i) in featured().buttons"
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
      <!-- 两个小卡片并排 -->
      <div v-if="secondaryCards().length" class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(card, i) in secondaryCards()"
          :key="i"
          class="bg-zinc-900 rounded-2xl border border-yellow-300/20 overflow-hidden flex flex-col md:flex-row hover:border-yellow-300 transition"
        >
          <div class="md:w-2/5 h-40 overflow-hidden shrink-0">
            <img
              v-if="card.image"
              :src="card.image"
              :alt="card.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-5 md:w-3/5">
            <span
              v-if="card.badge"
              class="bg-yellow-300/20 text-yellow-300 text-xs px-2 py-1 rounded-full"
            >
              {{ card.badge }}
            </span>
            <h4 class="font-bold text-white text-lg mt-2">{{ card.title }}</h4>
            <p class="text-gray-400 text-sm">{{ card.subtitle }}</p>
            <a
              v-if="card.linkText"
              :href="linkHref(card.linkUrl || '#')"
              class="inline-block mt-3 text-yellow-300 text-sm font-bold border-b border-yellow-300/30"
            >
              {{ card.linkText }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
