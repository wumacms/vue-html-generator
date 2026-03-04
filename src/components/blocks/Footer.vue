<script setup>
defineProps({
  block: { type: Object, required: true },
  basePath: { type: String, default: '' },
  currentPagePath: { type: String, default: '/' },
})
</script>

<template>
  <footer class="bg-background border-t border-border pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <span v-if="block.props?.logoEmoji" class="text-4xl filter drop-shadow-md">{{ block.props.logoEmoji }}</span>
            <span class="text-2xl font-black text-primary">{{ block.props?.brandName ?? 'MUSE' }}</span>
          </div>
          <p v-if="block.props?.tagline" class="text-muted-foreground text-sm max-w-xs">{{ block.props.tagline }}</p>
          <p v-if="block.props?.copyright" class="text-muted-foreground/60 text-xs mt-4">{{ block.props.copyright }}</p>
        </div>
        <div v-if="block.props?.addresses">
          <h4 class="text-primary font-bold mb-4">总部校区</h4>
          <p class="text-muted-foreground text-sm" v-html="block.props.addresses" />
        </div>
        <div v-if="block.props?.contact">
          <h4 class="text-primary font-bold mb-4">联系我们</h4>
          <p class="text-muted-foreground text-sm" v-html="block.props.contact" />
        </div>
        <div v-if="block.props?.qrImage">
          <h4 class="text-primary font-bold mb-4">公众号</h4>
          <div class="bg-muted p-3 rounded-xl inline-block border border-border">
            <img
              :src="block.props.qrImage"
              alt="公众号二维码"
              class="w-24 h-24 rounded-lg grayscale hover:grayscale-0 transition-all"
            />
          </div>
          <p v-if="block.props?.qrCaption" class="text-muted-foreground/50 text-xs mt-2">{{ block.props.qrCaption }}</p>
        </div>
      </div>
      <div v-if="block.props?.bottomLine" class="text-center text-muted-foreground/40 text-sm border-t border-border mt-12 pt-6">
        {{ block.props.bottomLine }}
      </div>
    </div>
  </footer>
</template>
