<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="py-10 px-6 text-center bg-[#1a1a2e] text-white">
    <h2 v-if="block.props?.title" class="text-xl font-medium mb-2">
      {{ block.props.title }}
    </h2>
    <p v-if="block.props?.text" class="mb-4 opacity-90">{{ block.props.text }}</p>
    <a
      v-if="block.props?.buttonUrl"
      :href="block.props.buttonUrl"
      class="inline-block py-2.5 px-5 bg-white text-[#1a1a2e] no-underline rounded-md font-semibold hover:opacity-90"
    >
      {{ block.props?.buttonText ?? '了解更多' }}
    </a>
  </section>
</template>
