<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="relative pt-16 pb-20 md:py-24 overflow-hidden min-h-[28rem] md:min-h-[32rem] flex items-center">
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
</template>
