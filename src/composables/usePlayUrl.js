import { syncRef } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useFengFetch } from './useFengFetch'

export function usePlayUrl(liveId) {
  const playUrl = ref('')
  const liveUrl = computed(() => {
    return `/api/v3/hub/live/auth-url?live_id=${liveId.value}&live_qa=HD`
  })
  const loading = ref(false)

  function updatePlayUrl() {
    loading.value = true
    const { data, onFetchResponse, isFetching } = useFengFetch(liveUrl).json()
    syncRef(isFetching, loading)
    onFetchResponse(() => {
      playUrl.value = data.value.data.live_url
    })
  }

  watch(
    liveId,
    (value) => {
      value && updatePlayUrl()
    },
    { immediate: true }
  )

  return { playUrl, loading }
}
