<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Event } from '@/model'
import HttpService from '@/service/HttpService';
import { useSnackbarStore } from '@/stores/SnackbarStore'
import { useEventStore } from '@/stores/EventStore'
import AddEventForm from '@/components/AddEventForm.vue'

const snackbarStore = useSnackbarStore()
const eventStore = useEventStore()
const events = ref<Event[]>([])

const loadEvents = async () => {
  const response = await HttpService.getEvents()
  if (response.data) {
    events.value = response.data
  } else if (response.error) {
    snackbarStore.setMessage(response.error)
  }
}

const formatTime = (time: string) => {
  return new Date(time).toLocaleString()
}

const canRegister = (event: Event): boolean => {
  return event.appUsers.length < event.participants
}

const register = (event: Event) => {
  if (canRegister(event)) {
    eventStore.openRegistrationForm()
    eventStore.setEvent(event)
  }
}

onMounted(() => {
  loadEvents()
})

</script>

<style scoped>
.error--text {
  color: red;
  font-weight: bold;
}
</style>

<template>
  <v-container>
    <v-row>
      <v-col v-for="event in events" :key="event.id" cols="12" md="6">
        <v-card>
          <v-card-title>{{ event.name }}</v-card-title>
          <v-card-subtitle>Start Time: {{ formatTime(event.time) }}</v-card-subtitle>
          <v-card-text>
            <p>Capacity: {{ event.appUsers.length }} / {{ event.participants }}</p>
            <v-progress-linear
              :value="(event.appUsers.length / event.participants) * 100"
              height="8"
              color="primary"
            ></v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="!canRegister(event)"
              @click="register(event)"
              color="primary"
            >
              Register
            </v-btn>
            <v-spacer></v-spacer>
            <span v-if="!canRegister(event)" class="error--text">Event Full</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <AddEventForm />
  </v-container>
</template>
