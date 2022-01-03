<script setup>
import { useToggle } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  url: String,
})

const [isShow, toggleShow] = useToggle()

const urlTest = computed(() => {
  const { host, pathname } = new URL(props.url)
  return `https://${host}${pathname}`
})
</script>

<template>
  <div v-if="url" class="play-tips">
    <p class="title" @click="toggleShow">无法播放？</p>
    <p v-if="isShow">
      <span>点击</span>
      <a :href="urlTest" target="_blank">链接</a>
      <br />
      <span>在新页面中点击 - （高级） - 继续前往访问</span>
      <br />
      <span>完成后返回本页面，刷新重试</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.play-tips {
  text-align: center;
}
.title {
  color: gray;
  cursor: pointer;
}
</style>
