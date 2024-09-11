import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('AuthStore', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  const isLoggedIn = computed(() => {
    return accessToken.value != null
  })

  const setAccessToken = (accToken: string) => {
    accessToken.value = accToken
  }

  const getAccessToken = computed(() => {
    return accessToken.value
  })

  const getRefreshToken = computed(() => {
    return refreshToken.value
  })

  const replaceRefreshToken = () => {
    accessToken.value = refreshToken.value
  }

  const setRefreshToken = (refrToken: string) => {
    refreshToken.value = refrToken
  }

  const logout = () => {
    accessToken.value = null
    refreshToken.value = null
  }

  return {
    isLoggedIn,
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    replaceRefreshToken,
    logout
  }
})
