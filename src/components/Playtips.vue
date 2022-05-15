<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: String,
})

const urlTest = computed(() => {
  const { host, pathname } = new URL(props.url)
  return `https://${host}${pathname}`
})

function reload() {
  location.reload()
}
</script>

<template>
  <div v-if="url">
    <p>无法播放时，可能需按以下步骤操作</p>

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
      <li>
        完成后返回本页面，
        <el-link type="primary" @click="reload">刷新</el-link>
        重试
      </li>
    </ul>
  </div>
</template>
