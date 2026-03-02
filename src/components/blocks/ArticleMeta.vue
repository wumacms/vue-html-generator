<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-black py-10 border-y border-yellow-300/20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap gap-2">
          <span v-if="block.props?.tagsLabel" class="text-yellow-300 font-bold text-sm">{{ block.props.tagsLabel }}</span>
          <a
            v-for="(tag, i) in (block.props?.tags ?? [])"
            :key="i"
            href="#"
            class="bg-zinc-900 border border-yellow-300/30 text-gray-300 px-3 py-1.5 rounded-full text-sm hover:bg-yellow-300 hover:text-black transition"
          >
            {{ tag }}
          </a>
        </div>
        <div v-if="block.props?.shareLabel" class="flex items-center gap-3">
          <span class="text-gray-400 text-sm">{{ block.props.shareLabel }}</span>
          <a href="#" class="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 hover:text-black transition">📤</a>
          <a href="#" class="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 hover:text-black transition">🐦</a>
          <a href="#" class="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-yellow-300 hover:text-black transition">🔗</a>
        </div>
      </div>
    </div>
  </section>
</template>
