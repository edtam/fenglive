<script setup>
import flvjs from 'flv.js'
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  url: String,
})
const emit = defineEmits(['error'])

const videoEl = ref(null)
let player = null

function playVideo(url) {
  if (player) {
    player.unload()
    player.detachMediaElement()
    player.destroy()
  }

  player = flvjs.createPlayer({
    type: 'flv',
    url,
    isLive: true,
  })
  player.on('error', (err) => {
    emit('error', err)
  })
  player.attachMediaElement(videoEl.value)
  player.load()
  player.play()
}

watch(
  () => props.url,
  async (url) => {
    await nextTick()
    playVideo(url)
  }
)
</script>

<template>
  <video
    v-if="url"
    ref="videoEl"
    controls
    autoplay
  ></video>
</template>

<style lang="scss" scoped>
video {
  display: block;
  width: 100%;
}
</style>
