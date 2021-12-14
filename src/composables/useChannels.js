import { useFengFetch } from './useFengFetch'

export function useChannels() {
  const channelsUrl = '/api/v3/live?live_type=tv&page=1&page_size=15'
  return useFengFetch(channelsUrl).json()
}
