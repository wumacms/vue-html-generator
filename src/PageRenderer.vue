<script setup>
import { computed } from 'vue'
import BlockRenderer from './components/BlockRenderer.vue'
import { getHref } from './utils/relativeHref.js'

const props = defineProps({
  page: { type: Object, required: true },
  site: { type: Object, required: true },
})

const basePath = computed(() => props.site.basePath ?? '')

function hrefTo(targetPath) {
  return getHref(props.page.path, targetPath, basePath.value)
}

const sortedBlocks = computed(() => {
  const blocks = props.page.blocks ?? []
  return [...blocks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
})
</script>

<template>
  <div class="min-h-screen">
    <header
      v-if="site.name"
      class="flex justify-between items-center py-4 px-6 border-b border-gray-200"
    >
      <a :href="hrefTo('/')" class="font-bold no-underline text-inherit">
        {{ site.name }}
      </a>
      <nav class="flex gap-4">
        <a
          v-for="p in site.pages"
          :key="p.path"
          :href="hrefTo(p.path)"
          class="text-gray-600 no-underline hover:underline"
        >
          {{ p.title ?? p.path }}
        </a>
      </nav>
    </header>
    <main class="min-h-[50vh]">
      <BlockRenderer
        v-for="block in sortedBlocks"
        :key="block.id"
        :block="block"
        :base-path="basePath"
        :current-page-path="page.path"
      />
    </main>
  </div>
</template>
