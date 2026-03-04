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
const navLinks = computed(() => props.site.nav?.links ?? [])
const navCta = computed(() => props.site.nav?.cta ?? null)
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground"
  >
    <!-- 统一导航栏 -->
    <nav
      v-if="hasNav"
      class="bg-background border-b border-border sticky top-0 z-50 transition-colors"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <a :href="hrefTo('/')" class="flex items-center gap-2 no-underline">
            <span v-if="site.nav?.logoEmoji" class="text-4xl filter drop-shadow-lg">{{ site.nav.logoEmoji }}</span>
            <template v-if="site.nav?.logoText">
              <span class="text-2xl font-black tracking-tight text-primary">{{ site.nav.logoText }}</span>
              <span v-if="site.nav?.logoTextTail" class="text-2xl font-black tracking-tight text-foreground">{{ site.nav.logoTextTail }}</span>
            </template>
          </a>
          <div class="hidden md:flex space-x-8 text-sm font-medium">
            <a
              v-for="link in navLinks"
              :key="link.path"
              :href="hrefTo(link.path)"
              class="transition no-underline"
              :class="[
                page.path === link.path
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-primary',
              ]"
            >
              {{ link.label }}
            </a>
          </div>
          <div v-if="navCta">
            <a
              :href="hrefTo(navCta.href)"
              class="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition shadow-lg shadow-primary/30 no-underline"
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
      class="flex justify-between items-center py-4 px-6 border-b border-border bg-background"
    >
      <a :href="hrefTo('/')" class="font-bold no-underline text-inherit">
        {{ site.name }}
      </a>
      <nav class="flex gap-4">
        <a
          v-for="p in site.pages"
          :key="p.path"
          :href="hrefTo(p.path)"
          class="text-muted-foreground no-underline hover:underline hover:text-foreground"
        >
          {{ p.title ?? p.path }}
        </a>
      </nav>
    </header>

    <main class="min-h-[50vh]">
      <BlockRenderer
        v-for="(block, index) in sortedBlocks"
        :key="block.id ?? `block-${index}`"
        :block="block"
        :base-path="basePath"
        :current-page-path="page.path"
      />
    </main>
  </div>
</template>
