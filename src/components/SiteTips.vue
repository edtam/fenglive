<script setup>
const isShowTips = location.hostname.includes('vercel.app')
</script>

<template>
  <p v-if="isShowTips">
    由于域名vercel.app受dns污染影响，访问可能受阻。现可通过
    <a href="https://feng.edtam.tk" target="_blank">feng.edtam.tk</a>
    访问本页面，感谢支持~
  </p>
</template>
