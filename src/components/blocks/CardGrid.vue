<script setup>
import { computed } from 'vue'
import { getHref } from '../../utils/relativeHref.js'
const variants = import.meta.glob('./CardGrid*.vue', { eager: true })
const variantComponents = Object.fromEntries(
  Object.entries(variants)
    .filter(([path]) => !path.includes('Fallback'))
    .map(([path, module]) => {
      const name = path.match(/\/CardGrid([^/]+)\.vue$/)[1]
      const key = name.charAt(0).toLowerCase() + name.slice(1)
      return [key, module.default]
    })
)
import CardGridFallback from './CardGridFallback.vue'

const props = defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})

const variant = computed(() => props.block.props?.variant || 'default')
const GridComponent = computed(() => variantComponents[variant.value] ?? CardGridFallback)
const sectionClass = computed(() => (variant.value === 'event' ? 'bg-muted' : 'bg-background'))

function linkHref(url) {
  return getHref(props.currentPagePath, url || '#', props.basePath)
}
</script>

<template>
  <section :class="[sectionClass, 'py-20 border-b border-border']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="block.props?.title || block.props?.subtitle" class="text-center mb-12">
        <h2 v-if="block.props?.title" class="text-3xl md:text-4xl font-black text-primary mb-2">
          {{ block.props.title }}
        </h2>
        <p v-if="block.props?.subtitle" class="text-muted-foreground text-lg mt-2">{{ block.props.subtitle }}</p>
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
          class="bg-transparent border-2 border-primary text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-primary-foreground transition inline-flex items-center gap-2"
        >
          {{ block.props.bottomButton.text }}
        </a>
      </div>
    </div>
  </section>
</template>
