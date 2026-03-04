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
        <h2 class="text-3xl md:text-4xl font-black text-primary">{{ block.props?.title ?? '学员故事' }}</h2>
        <p v-if="block.props?.subtitle" class="text-muted-foreground">{{ block.props.subtitle }}</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(item, i) in (block.props?.items ?? [])"
          :key="i"
          class="bg-muted p-6 rounded-3xl border border-border hover:border-primary transition"
        >
          <div class="flex items-center gap-3 mb-4">
            <img
              v-if="item.avatar"
              :src="item.avatar"
              :alt="item.name"
              class="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
            />
            <div>
              <h3 class="font-bold text-foreground">{{ item.name }}</h3>
              <p v-if="item.subtitle" class="text-xs text-primary">{{ item.subtitle }}</p>
            </div>
          </div>
          <p class="text-muted-foreground italic line-clamp-4">{{ item.quote ?? '' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
