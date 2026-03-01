<script setup>
import { ref, computed } from 'vue'

const loading = ref(false)
const result = ref(null) // { success, message, pagesCount?, error? }

const resultClass = computed(() => {
  if (!result.value) return ''
  return result.value.success ? 'success' : 'error'
})

async function generate() {
  loading.value = true
  result.value = null
  try {
    const res = await fetch('/api/generate', { method: 'POST' })
    const data = await res.json()
    result.value = data
  } catch (e) {
    result.value = {
      success: false,
      message: '请求失败',
      error: e.message,
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="admin-page">
    <h1>静态站点生成</h1>
    <p class="desc">
      根据当前项目下的 <code>site.json</code> 生成静态 HTML 到 <code>dist/</code> 目录。
      生成前请确保已执行 <code>pnpm run build:ssr</code> 和 <code>pnpm run build:css</code>。
    </p>
    <button
      type="button"
      class="btn"
      :disabled="loading"
      :aria-busy="loading"
      @click="generate"
    >
      <span v-if="loading" class="spinner" aria-hidden="true" />
      <span class="btn-text">{{ loading ? '生成中…' : '生成静态站点' }}</span>
    </button>
    <div
      v-if="result"
      class="result"
      :class="resultClass"
      role="status"
    >
      {{ result.message }}
      <div v-if="result.pagesCount != null" class="detail">
        共 {{ result.pagesCount }} 个页面
      </div>
      <div v-if="result.error" class="detail">
        {{ result.error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  max-width: 480px;
  margin: 48px auto;
  padding: 0 16px;
  color: #1a1a1a;
}

h1 {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.desc {
  color: #666;
  margin: 0 0 24px;
  font-size: 0.9rem;
}

.desc code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  font-size: 1rem;
  color: #fff;
  background: #0d6efd;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover:not(:disabled) {
  background: #0b5ed7;
}

.btn:disabled {
  background: #adb5bd;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.result {
  margin-top: 24px;
  padding: 16px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.result.success {
  background: #d1e7dd;
  color: #0a3622;
}

.result.error {
  background: #f8d7da;
  color: #58151c;
}

.result .detail {
  margin-top: 8px;
  opacity: 0.9;
}
</style>
