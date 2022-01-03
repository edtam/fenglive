<script setup>
import { ref } from 'vue'
import { useChannels } from '../composables/useChannels'
import { usePlayUrl } from '../composables/usePlayUrl'
import { fixImgUrl } from '../js/util'
import FlvPlayer from '../components/FlvPlayer.vue'
import Playtips from '../components/Playtips.vue'

const { data: channels, isFetching } = useChannels()

const channelId = ref('')
const { playUrl } = usePlayUrl(channelId)

function clickChannel({ _id }) {
  channelId.value = _id
}
</script>

<template>
  <p v-if="isFetching">正在加载频道...</p>

  <div class="channels">
    <div
      v-for="tv in channels"
      :key="tv._id"
      class="channel"
      :class="{ 'channel--active': tv._id === channelId }"
      @click="clickChannel(tv)"
    >
      <img :src="fixImgUrl(tv.logo)" alt="" />
      <strong>{{ tv.title }}</strong>
    </div>
  </div>

  <FlvPlayer :url="playUrl" />

  <Playtips :url="playUrl" />
</template>

<style lang="scss" scoped>
.channels {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}
.channel {
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 24px;
  font-size: 24px;
  cursor: pointer;
  &--active {
    background-color: #eee;
  }
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
