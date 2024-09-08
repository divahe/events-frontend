<script setup lang="ts">
import { useEventStore } from '@/stores/EventStore'
import EventList from '@/components/EventList.vue';
import MessageComponent from '@/components/MessageComponent.vue';
import { onMounted } from 'vue'
const eventStore = useEventStore()

onMounted(() => {
  eventStore.loadEvents()
})
</script>

<template>
  <v-container>
    <EventList/>
    <MessageComponent v-if="eventStore.events.length == 0"/>
  </v-container>
</template>
