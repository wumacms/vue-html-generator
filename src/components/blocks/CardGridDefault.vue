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
      class="bg-muted p-5 rounded-2xl border border-border flex items-start gap-4 hover:border-primary transition"
    >
      <span
        v-if="card.icon"
        class="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0"
      >
        {{ card.icon }}
      </span>
      <div>
        <h3 class="font-bold text-foreground text-lg">{{ card.title }}</h3>
        <p v-if="card.subtitle" class="text-sm text-muted-foreground">{{ card.subtitle }}</p>
      </div>
    </div>
  </div>
</template>
