<script setup lang="ts">
import type { User, RegistrationData } from '@/model/index'
import { ref, watch } from 'vue'
import { useEventStore } from '@/stores/EventStore'
import { useSnackbarStore } from '@/stores/SnackbarStore'
import HttpService from '@/service/HttpService'
const eventStore = useEventStore()
const snackbarStore = useSnackbarStore()

const user = ref<Partial<User>>({
  id: undefined,
  firstName: '',
  lastName: '',
  role: 'USER',
  idCode: ''
})

const formValid = (): boolean => {
  return user.value.firstName !== '' && user.value.lastName !== '' && user.value.idCode !== ''
}

watch(
  () => eventStore.showRegistrationForm,
  () => {
    user.value = {
      id: undefined,
      firstName: '',
      lastName: '',
      role: 'USER',
      idCode: ''
    }
  }
)

const submitRegistration = async () => {
  if (eventStore.selectedEvent) {
    const registrationData: RegistrationData = {
      eventId: eventStore.selectedEvent.id,
      appUser: user.value as Partial<User>
    }
    const response = await HttpService.register(registrationData)
    if (response.data) {
      eventStore.closeRegistrationForm()
      snackbarStore.setMessage('Registration was successful')
      eventStore.loadEvents()
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
        <v-form ref="registrationForm">
          <v-text-field v-model="user.firstName" label="First Name"></v-text-field>
          <v-text-field v-model="user.lastName" label="Last Name"></v-text-field>
          <v-text-field v-model="user.idCode" label="ID Code"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="eventStore.closeRegistrationForm()">Cancel</v-btn>
        <v-btn :disabled="!formValid()" color="primary" @click="submitRegistration()">Submit</v-btn>
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
