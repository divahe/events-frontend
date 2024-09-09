<script setup lang="ts">
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import type { Event } from '@/model/index'
import axiosInstance from '@/helpers/AxiosConfig'
import { useEventStore } from '@/stores/EventStore'
dayjs.extend(utc)
const eventStore = useEventStore()

const newEvent = ref<Partial<Event>>({
  name: '',
  participants: 0,
  time: '',
  appUsers: []
})
const valid = ref(false)

watch(
  () => eventStore.showAddEventForm,
  () => {
    newEvent.value = {
      name: '',
      participants: 0,
      time: '',
      appUsers: []
    }
  }
)

const addEvent = async () => {
  newEvent.value.time = dayjs(newEvent.value.time).utc().format()
  try {
    const response = await axiosInstance.post('events', newEvent.value)
    console.log(response.data)
    eventStore.closeAddEventForm()
    eventStore.loadEvents()
  } catch (error) {
    console.error('Failed to add event:', error)
  }
}
</script>

<template>
  <v-dialog v-model="eventStore.showAddEventForm" max-width="500">
    <v-card>
      <v-card-title>Add New Event</v-card-title>
      <v-card-text>
        <v-form ref="eventForm" v-model="valid">
          <v-text-field v-model="newEvent.name" label="Event Name" required></v-text-field>
          <v-text-field
            v-model="newEvent.participants"
            label="Max Participants"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="newEvent.time"
            class="pa"
            type="datetime-local"
            label="Event start"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click.prevent="eventStore.closeAddEventForm()">Cancel</v-btn>
        <v-btn color="primary" @click.prevent="addEvent()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.elevation-1 {
  margin-top: 20px;
}

.v-data-table {
  width: 100%;
}

.v-btn {
  margin-left: 10px;
}
</style>
