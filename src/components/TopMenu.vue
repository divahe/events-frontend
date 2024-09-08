<script lang="ts" setup>
import router from '@/router'
import { useAuthStore } from '@/stores/AuthStore'
import { useEventStore } from '@/stores/EventStore'
const authStore = useAuthStore()
const eventStore = useEventStore()

const openLogin = () => {
  router.push('/login')
}

const logOut = () => {
  authStore.logout()
  router.push('/')
}

const homePage = () => {
  router.push('/')
}

const addEvent = () => {
  eventStore.openAddEventForm()
}


</script>
<template>
  <v-card class="mx-auto">
    <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
        <v-container
          ><v-icon
            alt="calendar-icon"
            size="x-large"
            icon="mdi-calendar-text"
            @click.prevent="homePage()"
          ></v-icon
        ></v-container>
      </template>
      <v-app-bar-title>Event registration</v-app-bar-title>
      <v-btn v-if="authStore.isLoggedIn" alt="add event" size="x-large" @click.prevent="addEvent()"
        >Add Event</v-btn
      >
      <v-btn
        v-if="authStore.isLoggedIn"
        alt="admin logout"
        size="x-large"
        append-icon="mdi-logout"
        @click.prevent="logOut()"
        >Logout</v-btn
      >
      <v-btn
        v-else
        alt="admin logout"
        size="x-large"
        append-icon="mdi-logout"
        @click.prevent="openLogin()"
        >Login</v-btn
      >
    </v-app-bar>
  </v-card>
</template>
<style scoped>
.v-btn {
  text-transform: none;
}
</style>
