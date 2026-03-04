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
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-primary">{{ block.props?.title ?? '合作伙伴' }}</h2>
        <p v-if="block.props?.subtitle" class="text-muted-foreground mt-3">{{ block.props.subtitle }}</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div
          v-for="(item, i) in (block.props?.items ?? [])"
          :key="i"
          class="bg-muted p-4 rounded-2xl text-center border border-border hover:border-primary transition group"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="w-16 h-16 mx-auto rounded-full mb-2 filter grayscale group-hover:grayscale-0 transition-all border-2 border-transparent group-hover:border-primary/20"
          />
          <h3 class="font-bold text-foreground">{{ item.name }}</h3>
          <p v-if="item.tag" class="text-xs text-primary">{{ item.tag }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
