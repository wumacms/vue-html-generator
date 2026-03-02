<script setup>
import { getHref } from '../../utils/relativeHref.js'

const props = defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})

function linkHref(url) {
  return getHref(props.currentPagePath, url || '#', props.basePath)
}

const variant = () => props.block.props?.variant || 'default'
</script>

<template>
  <section :class="[variant() === 'event' ? 'bg-zinc-950' : 'bg-black', 'py-20']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="block.props?.title || block.props?.subtitle" class="text-center mb-12">
        <h2 v-if="block.props?.title" class="text-3xl md:text-4xl font-black text-yellow-300 mb-2">
          {{ block.props.title }}
        </h2>
        <p v-if="block.props?.subtitle" class="text-gray-400 text-lg mt-2">{{ block.props.subtitle }}</p>
      </div>
      <!-- default: icon + title + subtitle (course list) -->
      <div
        v-if="variant() === 'default'"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <div
          v-for="(card, i) in (block.props?.cards ?? [])"
          :key="i"
          class="bg-black p-5 rounded-2xl border border-yellow-300/20 flex items-start gap-4"
        >
          <span
            v-if="card.icon"
            class="text-3xl bg-yellow-300/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0"
          >
            {{ card.icon }}
          </span>
          <div>
            <h3 class="font-bold text-white text-lg">{{ card.title }}</h3>
            <p v-if="card.subtitle" class="text-sm text-gray-400">{{ card.subtitle }}</p>
          </div>
        </div>
      </div>
      <!-- teacher: image card with title, subtitle, badge, description, meta -->
      <div
        v-else-if="variant() === 'teacher'"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="(card, i) in (block.props?.cards ?? [])"
          :key="i"
          class="bg-zinc-900 rounded-3xl border border-yellow-300/20 overflow-hidden hover:border-yellow-300 transition group"
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
                <h3 class="text-2xl font-bold text-white">{{ card.title }}</h3>
                <p class="text-yellow-300 text-sm">{{ card.subtitle }}</p>
              </div>
              <span
                v-if="card.badge"
                class="bg-yellow-300/20 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-300/40"
              >
                {{ card.badge }}
              </span>
            </div>
            <p v-if="card.description" class="text-gray-400 text-sm mt-4">{{ card.description }}</p>
            <div v-if="(card.meta ?? []).length" class="flex gap-4 mt-4 text-sm text-gray-500">
              <span v-for="(m, j) in card.meta" :key="j">{{ m }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- campus: image, title, subtitle, badge, description, tags, two buttons -->
      <div
        v-else-if="variant() === 'campus'"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="(card, i) in (block.props?.cards ?? [])"
          :key="i"
          class="bg-zinc-900 rounded-3xl border border-yellow-300/20 overflow-hidden hover:border-yellow-300 transition group"
        >
          <div class="h-60 overflow-hidden">
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
                <h3 class="text-2xl font-bold text-white">{{ card.title }}</h3>
                <p class="text-yellow-300 text-sm">{{ card.subtitle }}</p>
              </div>
              <span
                v-if="card.badge"
                class="bg-yellow-300/20 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-300/40"
              >
                {{ card.badge }}
              </span>
            </div>
            <p v-if="card.description" class="text-gray-400 text-sm mt-3">{{ card.description }}</p>
            <div v-if="(card.tags ?? []).length" class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="(tag, j) in card.tags"
                :key="j"
                class="bg-black border border-yellow-300/30 text-gray-300 text-xs px-2 py-1 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex gap-3 mt-5">
              <a
                :href="linkHref('#')"
                class="bg-yellow-300 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-200 transition"
              >
                {{ card.primaryButton ?? '预约参观' }}
              </a>
              <a
                :href="linkHref('#')"
                class="border border-yellow-300 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-300 hover:text-black transition"
              >
                {{ card.secondaryButton ?? '路线' }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- event: badge, meta, title, subtitle, note, linkText -->
      <div
        v-else-if="variant() === 'event'"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <div
          v-for="(card, i) in (block.props?.cards ?? [])"
          :key="i"
          class="bg-black p-5 rounded-2xl border border-yellow-300/20 hover:border-yellow-300 transition"
        >
          <div class="flex justify-between items-start">
            <span
              v-if="card.badge"
              class="bg-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full"
            >
              {{ card.badge }}
            </span>
            <span v-if="card.meta" class="text-yellow-300 text-sm">{{ card.meta }}</span>
          </div>
          <h3 class="font-bold text-white text-lg mt-3">{{ card.title }}</h3>
          <p v-if="card.subtitle" class="text-sm text-gray-400">{{ card.subtitle }}</p>
          <p v-if="card.note" class="text-xs text-gray-500 mt-2">{{ card.note }}</p>
          <a
            v-if="card.linkText"
            :href="linkHref('#')"
            class="inline-block mt-3 text-yellow-300 text-sm font-bold border-b border-yellow-300/30"
          >
            {{ card.linkText }}
          </a>
        </div>
      </div>
      <!-- news: badge, title, subtitle, date, linkText, link -->
      <div
        v-else-if="variant() === 'news'"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="(card, i) in (block.props?.cards ?? [])"
          :key="i"
          class="bg-black p-5 rounded-2xl border border-yellow-300/20 hover:border-yellow-300 transition"
        >
          <span
            v-if="card.badge"
            class="bg-yellow-300/20 text-yellow-300 text-xs px-2 py-1 rounded-full inline-block mb-3"
          >
            {{ card.badge }}
          </span>
          <h3 class="font-bold text-white text-lg mb-2">{{ card.title }}</h3>
          <p v-if="card.subtitle" class="text-sm text-gray-400 mb-3">{{ card.subtitle }}</p>
          <div class="flex justify-between items-center">
            <span v-if="card.date" class="text-gray-500 text-xs">{{ card.date }}</span>
            <a
              v-if="card.linkText"
              :href="linkHref(card.link)"
              class="text-yellow-300 text-sm font-bold border-b border-yellow-300/30"
            >
              {{ card.linkText }}
            </a>
          </div>
        </div>
      </div>
      <div v-else class="grid gap-4">
        <div
          v-for="(card, i) in (block.props?.cards ?? [])"
          :key="i"
          class="p-4 border border-yellow-300/20 rounded-2xl"
        >
          <h3 class="font-bold text-white">{{ card.title }}</h3>
          <p class="text-gray-400 text-sm">{{ card.subtitle }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
