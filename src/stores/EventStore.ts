import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Event } from '@/model/index'
import HttpService from '@/service/HttpService'
import { useSnackbarStore } from '@/stores/SnackbarStore'

export const useEventStore = defineStore('EventStore', () => {
  const snackbarStore = useSnackbarStore()
  const showRegistrationForm = ref<boolean>(false)
  const showAddEventForm = ref<boolean>(false)
  const selectedEvent = ref<Event | null>(null)
  const events = ref<Event[]>([])

  const closeRegistrationForm = () => {
    showRegistrationForm.value = false
  }

  const openRegistrationForm = () => {
    showRegistrationForm.value = true
  }

  const closeAddEventForm = () => {
    showAddEventForm.value = false
  }

  const openAddEventForm = () => {
    showAddEventForm.value = true
  }

  const setEvent = (event: Event) => {
    selectedEvent.value = event
  }

  const getEvent = () => {
    return selectedEvent.value
  }

  const loadEvents = async () => {
    const response = await HttpService.getEvents()
    if (response.data) {
      events.value = response.data
    } else if (response.error) {
      snackbarStore.setMessage(response.error)
    }
  }

  const removeEvent = () => {
    selectedEvent.value = null
  }

  return {
    showRegistrationForm,
    closeRegistrationForm,
    openRegistrationForm,
    showAddEventForm,
    openAddEventForm,
    closeAddEventForm,
    getEvent,
    setEvent,
    loadEvents,
    removeEvent,
    selectedEvent,
    events
  }
})
