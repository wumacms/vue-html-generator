<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="py-12 px-6 text-center bg-gradient-to-br from-gray-100 to-gray-200">
    <h1 class="text-3xl font-semibold mb-2">{{ block.props?.title ?? '标题' }}</h1>
    <p v-if="block.props?.subtitle" class="text-lg text-gray-600 mb-4">
      {{ block.props.subtitle }}
    </p>
    <img
      v-if="block.props?.image"
      :src="basePath ? basePath.replace(/\/$/, '') + block.props.image : block.props.image"
      alt=""
      class="max-w-full h-auto rounded-lg mx-auto"
    />
  </section>
</template>
