<script setup lang="ts">
import { useSnackbarStore } from '@/stores/SnackbarStore'

const snackbarStore = useSnackbarStore()
</script>
<template>
  <v-snackbar
    v-model="snackbarStore.showMessage"
    vertical
    color="primary"
    close-on-content-click
    timeout="-1"
  >
    <v-container>
      {{ snackbarStore.message }}
    </v-container>
    <template v-slot:actions>
      <v-btn variant="text"> Click to close </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
