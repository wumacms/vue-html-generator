<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <section class="bg-background py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground text-lg leading-relaxed space-y-6">
      <template v-for="(p, i) in (block.props?.paragraphs ?? [])" :key="'p-' + i">
        <p
          v-if="i === 0"
          class="first-letter:text-5xl first-letter:text-primary first-letter:font-black first-letter:mr-2 first-letter:float-left"
        >
          {{ p }}
        </p>
        <p v-else>{{ p }}</p>
      </template>
      <template v-if="block.props?.subheadings?.length">
        <h2
          v-for="(h, i) in block.props.subheadings"
          :key="'h-' + i"
          class="text-2xl font-bold text-primary mt-8 mb-4"
        >
          {{ h.text }}
        </h2>
      </template>
      <div
        v-if="block.props?.quote"
        class="bg-muted border-l-4 border-primary p-5 my-8 rounded-r-2xl"
      >
        <p class="text-muted-foreground italic text-lg">{{ block.props.quote.text }}</p>
        <p v-if="block.props.quote.author" class="text-primary mt-2 font-bold">
          {{ block.props.quote.author }}
        </p>
      </div>
      <div
        v-if="block.props?.list"
        class="bg-muted border border-border rounded-3xl p-6 my-8"
      >
        <h3 class="text-xl font-bold text-primary mb-4">{{ block.props.list.title }}</h3>
        <ul class="space-y-2 text-muted-foreground">
          <li v-for="(item, i) in (block.props.list.items ?? [])" :key="i">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
