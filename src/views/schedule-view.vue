<script setup lang="ts">
import { useMatches } from '@/hooks/useMatches'
import Schedule from '../components/schedule.vue'

const { data: matches, isPending, error } = useMatches()
</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <Schedule v-if="matches" :matches />
</template>
