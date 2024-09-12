<script setup lang="ts">
import TopMenu from './components/TopMenu.vue'
import MessageSnackbar from '@/components/MessageSnackbar.vue'
</script>

<template>
  <v-app>
    <top-menu />
    <v-main>
      <router-view />
      <MessageSnackbar />
    </v-main>
  </v-app>
</template>

<style scoped></style>
