<script setup lang="ts">
import { useMatches } from '@/hooks/use-matches'
import { computed } from 'vue'
import { router } from '../router'

const { data: matches, isPending, error } = useMatches()

const teams = computed(() => new Set(matches.value?.map(match => match.homeTeam)))

</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <section class="teams">
    <template
      v-for="value in teams"
      :key="value"
    >
      <img
        :src="`https://flagsapi.codeaid.io/${value}.png`"
        class="flag"
        :alt="value"
        :title="value"
        @click="router.push({ name: 'team', params: { id: value } })"
      />
    </template>
  </section>

</template>
<style scoped>
.teams {
  display: grid;
  gap: 1rem;
  width: 50rem;
  align-self: center;
  padding-top: 2rem;
  justify-content: flex-start;
  align-content: space-evenly;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.flag {
  height: 6.75rem;
  width: 10rem;
  border: 1px solid;
  border-radius: 1.25rem;
  border-color: var(--color-border);
  margin: 0 auto;
  cursor: pointer;
  box-shadow: var(--shadow-elevated);
}
</style>
