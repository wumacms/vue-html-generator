<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-black py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 v-if="block.props?.title" class="text-3xl md:text-4xl font-black text-yellow-300">
          {{ block.props.title }}
        </h2>
        <p v-if="block.props?.subtitle" class="text-gray-400 text-lg mt-2">{{ block.props.subtitle }}</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, i) in (block.props?.items ?? [])"
          :key="i"
          class="bg-zinc-900 p-6 rounded-3xl border border-yellow-300/20 hover:border-yellow-300 transition group"
        >
          <div v-if="item.icon" class="text-5xl mb-3 group-hover:scale-110 transition-transform">{{ item.icon }}</div>
          <h3 class="text-xl font-bold text-yellow-300">{{ item.title ?? '特性' }}</h3>
          <p class="text-gray-400 text-sm mt-2">{{ item.description ?? '' }}</p>
          <span
            v-if="item.linkText"
            class="inline-block mt-4 text-yellow-300 text-sm font-bold border-b border-yellow-300/30 pb-0.5"
          >
            {{ item.linkText }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
