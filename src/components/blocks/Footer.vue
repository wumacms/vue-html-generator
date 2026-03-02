<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <footer class="bg-black border-t border-yellow-300/30 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <span v-if="block.props?.logoEmoji" class="text-4xl">{{ block.props.logoEmoji }}</span>
            <span class="text-2xl font-black text-yellow-300">{{ block.props?.brandName ?? 'YELLOWKEYS' }}</span>
          </div>
          <p v-if="block.props?.tagline" class="text-gray-400 text-sm max-w-xs">{{ block.props.tagline }}</p>
          <p v-if="block.props?.copyright" class="text-gray-500 text-xs mt-4">{{ block.props.copyright }}</p>
        </div>
        <div v-if="block.props?.addresses">
          <h4 class="text-yellow-300 font-bold mb-4">总部校区</h4>
          <p class="text-gray-400 text-sm" v-html="block.props.addresses" />
        </div>
        <div v-if="block.props?.contact">
          <h4 class="text-yellow-300 font-bold mb-4">联系我们</h4>
          <p class="text-gray-400 text-sm" v-html="block.props.contact" />
        </div>
        <div v-if="block.props?.qrImage">
          <h4 class="text-yellow-300 font-bold mb-4">公众号</h4>
          <div class="bg-zinc-900 p-3 rounded-xl inline-block border border-yellow-300/40">
            <img
              :src="block.props.qrImage"
              alt="公众号二维码"
              class="w-24 h-24 rounded-lg grayscale"
            />
          </div>
          <p v-if="block.props?.qrCaption" class="text-gray-500 text-xs mt-2">{{ block.props.qrCaption }}</p>
        </div>
      </div>
      <div v-if="block.props?.bottomLine" class="text-center text-gray-600 text-sm border-t border-yellow-300/20 mt-12 pt-6">
        {{ block.props.bottomLine }}
      </div>
    </div>
  </footer>
</template>
