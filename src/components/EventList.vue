<script setup lang="ts">
import type { Event } from '@/model'
import { useEventStore } from '@/stores/EventStore'
import AddEventForm from '@/components/AddEventForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'

const eventStore = useEventStore()

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
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="event-column" v-for="event in eventStore.events" :key="event.id">
        <v-card>
          <v-card-title>{{ event.name }}</v-card-title>
          <v-card-subtitle>Start Time: {{ formatTime(event.time) }}</v-card-subtitle>
          <v-card-text>
            <p>Capacity: {{ event.appUsers.length }} / {{ event.participants }}</p>
            <v-progress-linear
              :model-value="(event.appUsers.length / event.participants) * 100"
              height="8"
              color="primary"
            ></v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!canRegister(event)" @click.prevent="register(event)" color="primary">
              Register
            </v-btn>
            <v-spacer></v-spacer>
            <span v-if="!canRegister(event)" class="error--text">Event Full</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <AddEventForm />
    <RegistrationForm />
  </v-container>
</template>
<style scoped>
.error--text {
  color: red;
  font-weight: bold;
}
.event-column {
  min-width: 20em;
}
</style>
