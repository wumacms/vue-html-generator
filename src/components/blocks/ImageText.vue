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
  <section :class="[reverse() ? 'bg-muted' : 'bg-background', 'py-20 border-b border-border']">
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
            class="rounded-3xl border-4 border-primary/20 shadow-2xl w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <div class="md:w-1/2 space-y-5">
          <span
            v-if="block.props?.badge"
            class="text-primary font-bold text-sm bg-muted border border-primary px-4 py-1.5 rounded-full inline-block"
          >
            {{ block.props.badge }}
          </span>
          <h2 class="text-4xl font-black text-primary">{{ block.props?.title ?? '' }}</h2>
          <p class="text-muted-foreground text-lg">{{ block.props?.description ?? '' }}</p>
          <div v-if="(block.props?.tags ?? []).length" class="flex flex-wrap gap-2 pt-2">
            <span
              v-for="(tag, i) in block.props.tags"
              :key="i"
              class="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/30"
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
                  ? 'bg-primary text-primary-foreground hover:opacity-90'
                  : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
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
