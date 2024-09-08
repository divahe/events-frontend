import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Event } from '@/model/index';

export const useEventStore = defineStore('EventStore', () => {
  const showRegistrationForm = ref<boolean>(false)
  const showAddEventForm = ref<boolean>(false)
  const selectedEvent = ref<Event | null>(null)

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
    console.log("true")
  }

  const setEvent = (event: Event) => {
    selectedEvent.value = event
  }

  const getEvent = () => {
    return selectedEvent.value
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
    removeEvent,
    selectedEvent
  }
})
