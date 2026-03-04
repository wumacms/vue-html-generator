<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-background py-20 border-b border-border">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-black text-center text-primary mb-10">
        {{ block.props?.title ?? '常见问题' }}
      </h2>
      <div class="space-y-4">
        <div
          v-for="(item, i) in (block.props?.items ?? [])"
          :key="i"
          class="border border-border rounded-2xl p-5 hover:border-primary transition"
        >
          <h3 class="font-bold text-foreground text-lg">{{ item.question }}</h3>
          <p class="text-muted-foreground mt-1">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
