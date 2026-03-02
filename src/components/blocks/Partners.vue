<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-black py-16 border-y border-yellow-300/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-yellow-300">{{ block.props?.title ?? '合作伙伴' }}</h2>
        <p v-if="block.props?.subtitle" class="text-gray-400 mt-3">{{ block.props.subtitle }}</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div
          v-for="(item, i) in (block.props?.items ?? [])"
          :key="i"
          class="bg-zinc-900 p-4 rounded-2xl text-center border border-yellow-300/20 hover:border-yellow-300 transition"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="w-16 h-16 mx-auto rounded-full mb-2"
          />
          <h3 class="font-bold text-white">{{ item.name }}</h3>
          <p v-if="item.tag" class="text-xs text-yellow-300">{{ item.tag }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
