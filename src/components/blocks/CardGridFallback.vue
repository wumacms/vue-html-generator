<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <div class="grid gap-4">
    <div
      v-for="(card, i) in (block.props?.cards ?? [])"
      :key="i"
      class="p-4 border border-yellow-300/20 rounded-2xl"
    >
      <h3 class="font-bold text-white">{{ card.title }}</h3>
      <p class="text-gray-400 text-sm">{{ card.subtitle }}</p>
    </div>
  </div>
</template>
