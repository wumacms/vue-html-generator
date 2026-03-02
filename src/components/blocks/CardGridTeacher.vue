<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="(card, i) in (block.props?.cards ?? [])"
      :key="i"
      class="bg-zinc-900 rounded-3xl border border-yellow-300/20 overflow-hidden hover:border-yellow-300 transition group"
    >
      <div class="h-80 overflow-hidden">
        <img
          v-if="card.image"
          :src="card.image"
          :alt="card.title"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-2xl font-bold text-white">{{ card.title }}</h3>
            <p class="text-yellow-300 text-sm">{{ card.subtitle }}</p>
          </div>
          <span
            v-if="card.badge"
            class="bg-yellow-300/20 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-300/40"
          >
            {{ card.badge }}
          </span>
        </div>
        <p v-if="card.description" class="text-gray-400 text-sm mt-4">{{ card.description }}</p>
        <div v-if="(card.meta ?? []).length" class="flex gap-4 mt-4 text-sm text-gray-500">
          <span v-for="(m, j) in card.meta" :key="j">{{ m }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
