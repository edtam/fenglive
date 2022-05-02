<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: String,
})

const urlTest = computed(() => {
  const { host, pathname } = new URL(props.url)
  return `https://${host}${pathname}`
})
</script>

<template>
  <div v-if="url">
    <p>首次打开时无法播放，需按以下步骤操作</p>

    <ul>
      <li>
        <el-link type="primary" :href="urlTest" target="_blank">
          点击链接
        </el-link>
      </li>
      <li>
        在新页面中依次点击
        <ul>
          <li>高级</li>
          <li>继续前往访问</li>
        </ul>
      </li>
      <li>完成后返回本页面，刷新重试</li>
    </ul>
  </div>
</template>
