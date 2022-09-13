<script setup>
import { useSessionStorage, useToggle } from '@vueuse/core'
import { useChannels } from '../composables/useChannels'
import { usePlayUrl } from '../composables/usePlayUrl'
import { fixImgUrl } from '../js/util'
import FlvPlayer from '../components/FlvPlayer.vue'
import Playtips from '../components/Playtips.vue'
import SiteTips from '../components/SiteTips.vue'
import { ref } from 'vue'

const { data: channels, isFetching, error } = useChannels()

const channelId = ref('')
const channelIdCache = useSessionStorage('channel-id', '')
if (channelIdCache.value) {
  channelId.value = channelIdCache.value
  channelIdCache.value = ''
}
const { playUrl, loading: isFetchingUrl } = usePlayUrl(channelId)

function clickChannel({ _id }) {
  channelId.value = _id
  toggleTips(false)
}

const [isShowTips, toggleTips] = useToggle(false)

function reloadPage() {
  channelIdCache.value = channelId.value
  location.reload()
}
</script>

<template>
  <p v-if="isFetching">正在加载频道...</p>
  <p v-if="error">获取频道失败</p>

  <el-row justify="center" :gutter="12" v-loading="isFetchingUrl">
    <el-space wrap>
      <el-card
        v-for="tv in channels"
        :key="tv._id"
        class="channel"
        :shadow="tv._id === channelId ? 'always' : 'never'"
        :body-style="{ padding: '8px' }"
        @click="clickChannel(tv)"
      >
        <el-space>
          <img :src="fixImgUrl(tv.logo)" alt="" />
          <strong>{{ tv.title }}</strong>
        </el-space>
      </el-card>
    </el-space>
  </el-row>

  <el-divider />

  <el-row justify="center">
    <el-col :lg="16">
      <Playtips v-if="isShowTips" :url="playUrl" @reload="reloadPage" />
      <FlvPlayer :url="playUrl" @error="toggleTips(true)" />
      <SiteTips />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.channel {
  font-size: 24px;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
