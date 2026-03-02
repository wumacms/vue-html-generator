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
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div v-for="(item, i) in (block.props?.items ?? [])" :key="i">
          <div class="text-5xl font-black text-yellow-300">{{ item.value }}</div>
          <div class="text-gray-400">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
