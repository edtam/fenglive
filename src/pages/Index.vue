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

  <el-row justify="center" :gutter="12">
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
      <FlvPlayer :url="playUrl" />
      <Playtips :url="playUrl" />
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
