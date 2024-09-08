import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useAuthStore = defineStore('AuthStore', () => {
  const accessToken = ref<string | null>(null)

  const isLoggedIn = computed(() => {
    return accessToken.value != null
  })

  const setAccessToken = (accToken: string) => {
    accessToken.value = accToken
  }

  const getAccessToken = computed(() => {
    return accessToken.value
  })

  const logout = () => {
    accessToken.value = null
  }

  return {
    isLoggedIn,
    getAccessToken,
    setAccessToken,
    logout
  }
})
