<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { router } from '@/router'
import { createStatsPerTeam } from '@/utils/stats'
import type { TeamStatsRow } from '@/types/team'
import TeamStatsTable from '@/components/team-stats-table.vue'
import MatchesTable from '@/components/matches-table.vue'
import PageH1 from '@/components/page-h1.vue'
import { useFilteredMatches } from '@/hooks/use-filtered-matches'
import MatchesFilters from '@/components/matches-filters.vue'
import Calendar from '@/components/calendar.vue'
import { useMatchFilters } from '@/hooks/use-match-filters'
import { useStorage } from '@vueuse/core'
import { useMatches } from '@/hooks/use-matches'

const team = computed(() => { return router.currentRoute.value.params.id as string })

const teamStandings = ref<TeamStatsRow[]>([])

const calendarView = ref(false)

const favourite = useStorage('favourite-team', '')

const { filters, handlePlayedMatches } = useMatchFilters({ matchPlayed: true })

const { teamMatches, isPending, error } = useFilteredMatches(filters, team)

const matchDates = computed(() => teamMatches.value.map(match => new Date(match.matchDate)).sort((a: Date, b: Date) => a.getTime() - b.getTime()))

const { data: teamStats } = useMatches(createStatsPerTeam)

watch(teamMatches, () => {
  if(!teamStats.value) return
  teamStandings.value = [{ team: { name: team.value, post: false }, ...teamStats.value[team.value] }]
}, { immediate: true })

</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-if="error">Error loading matches</div>
  <section class="teams">
    <PageH1>{{ team }}
      <i
        v-if="favourite === team"
        title="This team is your favourite"
        class="pi pi-star-fill"
        @click="favourite = ''"
        style="font-size: 1rem"
      />
      <i
        v-else
        title="Make this team your favourite"
        class="pi pi-star"
        @click="favourite = team"
        style="font-size: 1rem"
      />
    </PageH1>

    <TeamStatsTable
      v-if="teamStats"
      title="Stats"
      :rows="teamStandings"
    />
    <MatchesFilters
      v-bind="filters"
      :calendar-view
      @match-payed="handlePlayedMatches"
      @calendar-view="$e => calendarView = $e"
    />
    <MatchesTable
      v-if="teamStats && !calendarView"
      title="Matches"
      :rows="teamMatches"
    />
    <Calendar
      v-if="calendarView"
      :match-dates
      :matches="teamMatches"
    />
  </section>

</template>
<style scoped>
.teams {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
}
</style>
