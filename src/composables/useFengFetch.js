import { createFetch } from '@vueuse/core'

export const useFengFetch = createFetch({
  baseUrl: 'https://m.fengshows.com',
  options: {
    beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        'fengshows-client': 'app(android,5020201);Meizu 16 X;27',
      }
      return { options }
    },
  },
})
