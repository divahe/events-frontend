<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { LoginData } from '@/model/index'
import HttpService from '@/service/HttpService'
import { useAuthStore } from '@/stores/AuthStore'
import { useSnackbarStore } from '@/stores/SnackbarStore'
import router from '@/router'

const snackbarStore = useSnackbarStore()
const authStore = useAuthStore()
const userData: Ref<LoginData> = ref({
  username: '',
  password: ''
})
const email = 'email'
const password = 'password'
const submitLogin = async () => {
  const response = await HttpService.login(userData.value)
  if (response.data) {
    authStore.setAccessToken(response.data.accessToken)
    authStore.setRefreshToken(response.data.refreshToken)
    router.push('/')
  } else if (response.error) {
    snackbarStore.setMessage(response.error)
  }
}
</script>

<template>
  <v-card id="frame">
    <v-container>
      <v-form ref="loginForm" @submit.prevent="submitLogin">
        <v-text-field
          density="compact"
          v-model="userData.username"
          :label="email"
          required
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="userData.password"
          :label="password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary" @click.prevent="submitLogin()">login</v-btn>
      </v-form></v-container
    >
  </v-card>
</template>

<style scoped>
.v-btn {
  margin: 0.4em;
}
#frame {
  width: 20em;
  margin: 0 auto;
}
</style>
