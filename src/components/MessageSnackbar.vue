<script setup lang="ts">
import { useSnackbarStore } from '@/stores/SnackbarStore'

const snackbarStore = useSnackbarStore()
</script>

<template>
  <v-snackbar
    v-model="snackbarStore.showMessage"
    multi-line
    vertical
    color="primary"
    close-on-content-click
    timeout="-1"
  >
    <div>
      <li>
        {{ snackbarStore.message }}
      </li>
    </div>
    <template v-slot:actions>
      <v-btn variant="text"> Click to close </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
