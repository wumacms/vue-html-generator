<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <div
      v-for="(card, i) in (block.props?.cards ?? [])"
      :key="i"
      class="bg-black p-5 rounded-2xl border border-yellow-300/20 flex items-start gap-4"
    >
      <span
        v-if="card.icon"
        class="text-3xl bg-yellow-300/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0"
      >
        {{ card.icon }}
      </span>
      <div>
        <h3 class="font-bold text-white text-lg">{{ card.title }}</h3>
        <p v-if="card.subtitle" class="text-sm text-gray-400">{{ card.subtitle }}</p>
      </div>
    </div>
  </div>
</template>
