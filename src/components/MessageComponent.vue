<script setup lang="ts"></script>
<template>
    <v-container class="d-flex align-center justify-center" fluid>
      <v-card class="pa-4" max-width="400" outlined>
        <v-card-title class="text-center headline">No Events Available</v-card-title>
        <v-card-subtitle class="text-center mb-4">Currently, there are no events to display.</v-card-subtitle>
        <v-card-subtitle class="text-center mb-4">Please check again later.</v-card-subtitle>
        <v-card-actions class="d-flex justify-center">
            <v-icon
            alt="nothing to display"
            size="x-large"
            icon="mdi-database-search-outline"
          ></v-icon
        >
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  <style scoped>
  .v-card {
    background-color: #f5f5f5;
  }
  .headline {
    font-weight: 500;
  }
  </style>
