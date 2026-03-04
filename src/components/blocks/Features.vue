<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-background py-20 border-b border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 v-if="block.props?.title" class="text-3xl md:text-4xl font-black text-primary">
          {{ block.props.title }}
        </h2>
        <p v-if="block.props?.subtitle" class="text-muted-foreground text-lg mt-2">{{ block.props.subtitle }}</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, i) in (block.props?.items ?? [])"
          :key="i"
          class="bg-muted p-6 rounded-3xl border border-border hover:border-primary transition group"
        >
          <div v-if="item.icon" class="text-5xl mb-3 group-hover:scale-110 transition-transform">{{ item.icon }}</div>
          <h3 class="text-xl font-bold text-primary">{{ item.title ?? '特性' }}</h3>
          <p class="text-muted-foreground text-sm mt-2">{{ item.description ?? '' }}</p>
          <span
            v-if="item.linkText"
            class="inline-block mt-4 text-primary text-sm font-bold border-b border-primary/30 pb-0.5"
          >
            {{ item.linkText }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
