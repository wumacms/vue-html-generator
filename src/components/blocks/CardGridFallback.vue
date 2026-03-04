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
      class="p-4 border border-border rounded-2xl bg-muted"
    >
      <h3 class="font-bold text-foreground">{{ card.title }}</h3>
      <p class="text-muted-foreground text-sm">{{ card.subtitle }}</p>
    </div>
  </div>
</template>
