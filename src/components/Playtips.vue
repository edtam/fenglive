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
    <el-link type="info" @click="toggleShow">无法播放？</el-link>
  </div>

  <el-dialog title="提示" v-model="isShow">
    <el-timeline>
      <el-timeline-item>
        <el-link type="primary" :href="urlTest" target="_blank">
          点击链接
        </el-link>
      </el-timeline-item>
      <el-timeline-item>
        <span>在新页面中依次点击</span>
      </el-timeline-item>
      <el-timeline-item>
        <span>1、高级</span>
      </el-timeline-item>
      <el-timeline-item>
        <span>2、继续前往访问</span>
      </el-timeline-item>
      <el-timeline-item>
        <span>完成后返回本页面，刷新重试</span>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<style lang="scss" scoped>
.play-tips {
  text-align: center;
}
</style>
