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

const variant = () => props.block.props?.variant || 'default'
const isCover = () => variant() === 'cover'
const isArticle = () => variant() === 'article'
</script>

<template>
  <!-- 文章页 Hero：背景图 + 蒙版 + 面包屑/标题 -->
  <section
    v-if="isArticle()"
    class="relative py-24 md:py-32 overflow-hidden"
  >
    <div class="absolute inset-0 z-0">
      <img
        v-if="block.props?.image"
        :src="block.props.image"
        :alt="block.props.imageAlt || ''"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
    </div>
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="(block.props?.breadcrumb ?? []).length" class="text-sm text-gray-300 mb-4">
        <template v-for="(item, i) in block.props.breadcrumb" :key="i">
          <a
            v-if="item.url"
            :href="linkHref(item.url)"
            class="hover:text-yellow-300 transition"
          >{{ item.label }}</a>
          <span v-else class="text-yellow-300">{{ item.label }}</span>
          <span v-if="i < block.props.breadcrumb.length - 1" class="mx-2 text-gray-400">/</span>
        </template>
      </div>
      <div v-if="block.props?.badge || block.props?.date" class="flex gap-3 items-center mb-4">
        <span
          v-if="block.props?.badge"
          class="bg-yellow-300 text-black text-xs px-3 py-1 rounded-full font-bold"
        >
          {{ block.props.badge }}
        </span>
        <span v-if="block.props?.date" class="text-gray-200 text-sm">{{ block.props.date }}</span>
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-yellow-300 leading-tight drop-shadow-lg">
        {{ block.props?.title ?? '' }}
      </h1>
      <div v-if="(block.props?.meta ?? []).length" class="flex items-center gap-4 mt-6 text-gray-200">
        <span v-for="(m, i) in block.props.meta" :key="i">{{ m }}</span>
      </div>
    </div>
  </section>

  <!-- 全屏背景图 Hero（课程页等） -->
  <section
    v-else-if="isCover()"
    class="relative pt-16 pb-20 md:py-24 overflow-hidden min-h-[28rem] md:min-h-[32rem] flex items-center"
  >
    <div class="absolute inset-0 z-0">
      <img
        v-if="block.props?.image"
        :src="block.props.image"
        :alt="block.props.imageAlt || ''"
        class="w-full h-full object-cover"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
    </div>
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto">
        <span
          v-if="block.props?.badge"
          class="inline-block bg-yellow-300/10 text-yellow-300 border border-yellow-300/30 px-4 py-1 rounded-full text-sm font-bold mb-6 drop-shadow-lg"
        >
          {{ block.props.badge }}
        </span>
        <h1 class="text-5xl md:text-6xl font-black leading-tight drop-shadow-lg">
          <span v-if="block.props?.titleLine1">{{ block.props.titleLine1 }}</span>
          <span v-if="block.props?.titleHighlight" class="text-yellow-300">{{ block.props.titleHighlight }}</span>
          <span v-if="block.props?.titleLine2">{{ block.props.titleLine2 }}</span>
        </h1>
        <p v-if="block.props?.subtitle" class="text-xl text-gray-200 mt-6 max-w-2xl mx-auto drop-shadow-md">
          {{ block.props.subtitle }}
        </p>
        <div v-if="(block.props?.tags ?? []).length" class="flex flex-wrap gap-3 justify-center mt-10">
          <span
            v-for="(tag, i) in block.props.tags"
            :key="i"
            class="bg-black/50 backdrop-blur-sm text-yellow-300 px-4 py-2 rounded-full text-sm border border-yellow-300/30 shadow-lg"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- 默认双栏 Hero（左文右图） -->
  <section
    v-else
    class="relative bg-gradient-to-b from-black to-zinc-900 overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <span
            v-if="block.props?.badge"
            class="inline-block bg-yellow-300/10 text-yellow-300 border border-yellow-300/30 px-4 py-1.5 rounded-full text-sm font-bold"
          >
            {{ block.props.badge }}
          </span>
          <h1 class="text-5xl md:text-6xl font-black leading-tight">
            <span v-if="block.props?.titleLine1 && block.props.titleLine1 !== block.props?.titleHighlight" class="text-white">{{ block.props.titleLine1 }}</span>
            <span v-if="block.props?.titleHighlight" class="text-yellow-300">{{ block.props.titleHighlight }}</span>
            <span v-if="block.props?.titleLine2" v-html="' ' + (block.props.titleLine2 || '').replace(/\n/g, '<br>')" />
          </h1>
          <p v-if="block.props?.subtitle" class="text-xl text-gray-300 max-w-lg">
            {{ block.props.subtitle }}
          </p>
          <p v-if="block.props?.note" class="text-gray-400 text-sm">{{ block.props.note }}</p>
          <div v-if="(block.props?.buttons ?? []).length" class="flex flex-wrap gap-4 pt-4">
            <a
              v-for="(btn, i) in block.props.buttons"
              :key="i"
              :href="linkHref(btn.url)"
              :class="[
                btn.primary
                  ? 'bg-yellow-300 text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-yellow-300/40 hover:bg-yellow-200 transition'
                  : 'border-2 border-yellow-300 text-yellow-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-black transition',
              ]"
            >
              {{ btn.text }}
            </a>
          </div>
        </div>
        <div class="relative h-72 sm:h-80 md:h-96">
          <img
            v-if="block.props?.image"
            :src="basePath ? basePath.replace(/\/$/, '') + block.props.image : block.props.image"
            :alt="block.props.imageAlt || ''"
            class="w-full h-full object-cover rounded-3xl border-4 border-yellow-300/30 shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </section>
</template>
