<script setup lang="ts">
import type { Event, User, RegistrationData } from '@/model/index'
import { ref } from 'vue'
import { useEventStore } from '@/stores/EventStore'
import { useSnackbarStore } from '@/stores/SnackbarStore'
import HttpService from '@/service/HttpService'
const eventStore = useEventStore()
const snackbarStore = useSnackbarStore()
// const props = defineProps<{
//   selectedEvent: Event
// }>()

const valid = ref(false)
const user = ref<User>({
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  role: 'USER',
  idCode: ''
})

const submitRegistration = async () => {
  if (eventStore.selectedEvent) {
    const registrationData: RegistrationData = {
      eventId: eventStore.selectedEvent.id,
      user: user.value
    }
    const response = await HttpService.register(registrationData)
    if (response.data) {
      eventStore.closeRegistrationForm()
      snackbarStore.setMessage('Registration was successful')
    } else if (response.error) {
      snackbarStore.setMessage(response.error)
    }
  }
}
</script>

<template>
  <v-dialog v-model="eventStore.showRegistrationForm" max-width="500">
    <v-card>
      <v-card-title>Register for {{ eventStore.selectedEvent?.name }}</v-card-title>
      <v-card-text>
        <v-form ref="registrationForm" v-model="valid">
          <v-text-field v-model="user.firstName" label="First Name" required></v-text-field>
          <v-text-field v-model="user.lastName" label="Last Name" required></v-text-field>
          <v-text-field v-model="user.idCode" label="ID Code" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitRegistration">Submit</v-btn>
        <v-btn @click="eventStore.closeRegistrationForm()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.error--text {
  color: red;
  font-weight: bold;
}
</style>
