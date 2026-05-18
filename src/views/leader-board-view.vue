<script setup lang="ts">
import LeaderBoard from '../components/leader-board.vue'
import { useMatches } from '../hooks/use-matches'

const { data: matches, error, isPending } = useMatches()

</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <LeaderBoard v-if="matches" :matches />
</template>
