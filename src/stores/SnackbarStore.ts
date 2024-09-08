import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('SnackbarStore', () => {
  const message = ref<string | null>(null)
  const showMessage = ref<boolean>(false)

  const setMessage = (newMessage: string) => {
    message.value = newMessage
    showMessage.value = true
  }

  const removeMessage = () => {
    message.value = null
    showMessage.value = false
  }

  return {
    setMessage,
    removeMessage,
    showMessage,
    message
  }
})
