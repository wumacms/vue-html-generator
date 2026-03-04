<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-background py-16 border-y border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div v-for="(item, i) in (block.props?.items ?? [])" :key="i">
          <div class="text-5xl font-black text-primary">{{ item.value }}</div>
          <div class="text-muted-foreground">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
