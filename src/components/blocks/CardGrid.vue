<script setup>
import { computed } from 'vue'
import { getHref } from '../../utils/relativeHref.js'
import CardGridDefault from './CardGridDefault.vue'
import CardGridTeacher from './CardGridTeacher.vue'
import CardGridCampus from './CardGridCampus.vue'
import CardGridEvent from './CardGridEvent.vue'
import CardGridEventReview from './CardGridEventReview.vue'
import CardGridNews from './CardGridNews.vue'
import CardGridFallback from './CardGridFallback.vue'

const variantComponents = {
  default: CardGridDefault,
  teacher: CardGridTeacher,
  campus: CardGridCampus,
  event: CardGridEvent,
  eventReview: CardGridEventReview,
  news: CardGridNews,
}

const props = defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})

const variant = computed(() => props.block.props?.variant || 'default')
const GridComponent = computed(() => variantComponents[variant.value] ?? CardGridFallback)
const sectionClass = computed(() => (variant.value === 'event' ? 'bg-zinc-950' : 'bg-black'))

function linkHref(url) {
  return getHref(props.currentPagePath, url || '#', props.basePath)
}
</script>

<template>
  <section :class="[sectionClass, 'py-20']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="block.props?.title || block.props?.subtitle" class="text-center mb-12">
        <h2 v-if="block.props?.title" class="text-3xl md:text-4xl font-black text-yellow-300 mb-2">
          {{ block.props.title }}
        </h2>
        <p v-if="block.props?.subtitle" class="text-gray-400 text-lg mt-2">{{ block.props.subtitle }}</p>
      </div>
      <Component
        :is="GridComponent"
        :block="block"
        :base-path="basePath"
        :current-page-path="currentPagePath"
      />
      <div
        v-if="block.props?.bottomButton?.text"
        class="text-center mt-12"
      >
        <a
          :href="linkHref(block.props.bottomButton.href || '#')"
          class="bg-transparent border-2 border-yellow-300 text-yellow-300 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-black transition inline-flex items-center gap-2"
        >
          {{ block.props.bottomButton.text }}
        </a>
      </div>
    </div>
  </section>
</template>
