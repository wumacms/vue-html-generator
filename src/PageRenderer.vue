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

const hasNav = computed(() => props.site.nav && typeof props.site.nav === 'object')
const isYellowKeys = computed(() => props.site.theme === 'yellow-keys')
const navLinks = computed(() => props.site.nav?.links ?? [])
const navCta = computed(() => props.site.nav?.cta ?? null)
</script>

<template>
  <div
    class="min-h-screen"
    :class="{ 'bg-black text-white antialiased': isYellowKeys }"
  >
    <!-- 黄黑键风格导航 -->
    <nav
      v-if="hasNav"
      class="bg-black border-b border-yellow-300/20 sticky top-0 z-50"
      :class="{ 'border-yellow-300/20': isYellowKeys }"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <a :href="hrefTo('/')" class="flex items-center gap-2">
            <span v-if="site.nav?.logoEmoji" class="text-4xl filter drop-shadow-lg">{{ site.nav.logoEmoji }}</span>
            <span
              v-if="site.nav?.logoText"
              class="text-2xl font-black tracking-tight"
              :class="isYellowKeys ? 'text-yellow-300' : 'text-gray-900'"
            >
              {{ site.nav.logoText }}
            </span>
          </a>
          <div class="hidden md:flex space-x-8 text-sm font-medium">
            <a
              v-for="link in navLinks"
              :key="link.path"
              :href="hrefTo(link.path)"
              :class="[
                page.path === link.path
                  ? isYellowKeys ? 'text-yellow-300' : 'text-gray-900 font-semibold'
                  : isYellowKeys ? 'text-gray-300 hover:text-yellow-300' : 'text-gray-600 hover:text-gray-900',
                'transition no-underline',
              ]"
            >
              {{ link.label }}
            </a>
          </div>
          <div v-if="navCta">
            <a
              :href="hrefTo(navCta.href)"
              class="bg-yellow-300 text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-yellow-200 transition shadow-lg shadow-yellow-300/30 no-underline"
            >
              {{ navCta.text }}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- 无 site.nav 时使用简易顶栏 -->
    <header
      v-else-if="site.name"
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
