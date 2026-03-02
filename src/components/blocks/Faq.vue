<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-black py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-black text-center text-yellow-300 mb-10">
        {{ block.props?.title ?? '常见问题' }}
      </h2>
      <div class="space-y-4">
        <div
          v-for="(item, i) in (block.props?.items ?? [])"
          :key="i"
          class="border border-yellow-300/30 rounded-2xl p-5"
        >
          <h3 class="font-bold text-white text-lg">{{ item.question }}</h3>
          <p class="text-gray-400 mt-1">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
