<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-background py-10 border-y border-border">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap gap-2">
          <span v-if="block.props?.tagsLabel" class="text-primary font-bold text-sm">{{ block.props.tagsLabel }}</span>
          <a
            v-for="(tag, i) in (block.props?.tags ?? [])"
            :key="i"
            href="#"
            class="bg-muted border border-border text-muted-foreground px-3 py-1.5 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition"
          >
            {{ tag }}
          </a>
        </div>
        <div v-if="block.props?.shareLabel" class="flex items-center gap-3">
          <span class="text-muted-foreground text-sm">{{ block.props.shareLabel }}</span>
          <a href="#" class="bg-muted w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">📤</a>
          <a href="#" class="bg-muted w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">🐦</a>
          <a href="#" class="bg-muted w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">🔗</a>
        </div>
      </div>
    </div>
  </section>
</template>
