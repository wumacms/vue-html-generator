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
  <section class="bg-background py-16 border-b border-border">
    <div class="max-w-3xl mx-auto text-center px-4">
      <span
        v-if="block.props?.badge"
        class="text-primary bg-muted border border-primary px-3 py-1 rounded-full text-sm font-bold inline-block mb-4"
      >
        {{ block.props.badge }}
      </span>
      <h2
        v-if="block.props?.title"
        class="text-4xl font-black text-primary mb-4"
      >
        {{ block.props.title }}
      </h2>
      <p
        v-if="block.props?.text"
        class="text-muted-foreground text-lg mb-8"
      >
        {{ block.props.text }}
      </p>
      <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
        <input
          type="email"
          :placeholder="block.props?.emailPlaceholder"
          class="bg-muted border border-border rounded-full px-6 py-4 flex-1 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition"
        />
        <a
          v-if="block.props?.subscribeButtonText"
          :href="linkHref(block.props.subscribeButtonUrl || '#')"
          class="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition whitespace-nowrap text-center"
        >
          {{ block.props.subscribeButtonText }}
        </a>
      </div>
      <p v-if="block.props?.footerNote" class="text-xs text-muted-foreground/50 mt-4">
        {{ block.props.footerNote }}
      </p>
    </div>
  </section>
</template>
