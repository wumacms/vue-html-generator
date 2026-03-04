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
      class="bg-muted rounded-3xl border border-border overflow-hidden hover:border-primary transition group"
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
            <h3 class="text-2xl font-bold text-foreground">{{ card.title }}</h3>
            <p class="text-primary text-sm">{{ card.subtitle }}</p>
          </div>
          <span
            v-if="card.badge"
            class="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full border border-primary/40"
          >
            {{ card.badge }}
          </span>
        </div>
        <p v-if="card.description" class="text-muted-foreground text-sm mt-4">{{ card.description }}</p>
        <div v-if="(card.meta ?? []).length" class="flex gap-4 mt-4 text-sm text-muted-foreground/60">
          <span v-for="(m, j) in card.meta" :key="j">{{ m }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
