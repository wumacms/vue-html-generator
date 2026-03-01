<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="py-8 px-6 max-w-5xl mx-auto">
    <h2 v-if="block.props?.title" class="text-xl font-medium text-center mb-6">
      {{ block.props.title }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, i) in (block.props?.items || [])"
        :key="i"
        class="p-4 border border-gray-200 rounded-lg"
      >
        <h3 class="text-lg font-medium mb-2">{{ item.title ?? '特性' }}</h3>
        <p class="text-sm text-gray-600">{{ item.description ?? '' }}</p>
      </div>
    </div>
  </section>
</template>
