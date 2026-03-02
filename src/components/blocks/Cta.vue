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

const isDark = () => props.block.props?.variant === 'dark'
</script>

<template>
  <section
    :class="[
      isDark() ? 'bg-black py-16 border-y border-yellow-300/20' : 'bg-yellow-300 py-20',
    ]"
  >
    <div
      :class="[
        isDark() ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : 'max-w-3xl mx-auto text-center px-4',
        isDark() && (block.props?.buttons ?? []).length ? 'grid md:grid-cols-2 gap-8 items-center' : '',
      ]"
    >
      <!-- 左侧/顶部：badge + title + text。dark 双列时仅左侧显示，否则整块居中显示 -->
      <div
        :class="isDark() && (block.props?.buttons ?? []).length ? 'md:col-span-1' : ''"
      >
        <span
          v-if="block.props?.badge"
          :class="[
            isDark()
              ? 'text-yellow-300 bg-black border border-yellow-300 px-3 py-1 rounded-full text-sm font-bold inline-block mb-4'
              : 'text-black bg-white/30 px-3 py-1 rounded-full text-sm font-bold',
          ]"
        >
          {{ block.props.badge }}
        </span>
        <h2
          v-if="block.props?.title"
          :class="[
            isDark() ? 'text-2xl font-bold text-yellow-300 mb-2' : 'text-4xl md:text-5xl font-black text-black mb-4',
            { 'mt-6': block.props?.badge && !isDark() },
          ]"
        >
          {{ block.props.title }}
        </h2>
        <p
          v-if="block.props?.text"
          :class="[isDark() ? 'text-gray-400 mt-2' : 'text-lg text-black/80 mb-8']"
        >
          {{ block.props.text }}
        </p>
      </div>
      <!-- 按钮组 -->
      <div
        v-if="(block.props?.buttons ?? []).length"
        :class="[isDark() ? 'md:col-span-1 text-right' : 'flex flex-wrap gap-4 justify-center']"
      >
        <a
          v-for="(btn, i) in block.props.buttons"
          :key="i"
          :href="linkHref(btn.url)"
          :class="[
            isDark()
              ? 'border-2 border-yellow-300 text-yellow-300 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:text-black transition inline-block'
              : btn.primary
                ? 'bg-black text-yellow-300 px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:bg-zinc-900 transition'
                : 'bg-transparent border-4 border-black text-black px-10 py-4 rounded-full font-bold text-xl hover:bg-black hover:text-yellow-300 transition',
          ]"
        >
          {{ btn.text }}
        </a>
      </div>
      <p v-if="block.props?.footerNote && !isDark()" class="text-sm text-black/60 mt-6">{{ block.props.footerNote }}</p>
    </div>
  </section>
</template>
