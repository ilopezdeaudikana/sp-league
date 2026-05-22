<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

interface FiltersProps {
  matchPlayed?: boolean
  showSearch?: boolean
  calendarView?: boolean
}

interface FiltersEmits {
  (e: 'match-payed', played: boolean): void,
  (e: 'calendar-view', isCalendar: boolean): void,
  (e: 'search', team: string): void
}

const { matchPlayed, showSearch, calendarView } = defineProps<FiltersProps>()

const emit = defineEmits<FiltersEmits>()

const team = defineModel<string>('team', { default: '' })

</script>
<template>
  <div class="filters">
    <Button
      class="button"
      @click="$emit('calendar-view', !calendarView)"
    >
      {{ calendarView ? 'Table view' : 'Calendar view' }}
    </Button>
    <Button
      class="button"
      @click="$emit('match-payed', !matchPlayed)"
    >
      {{ matchPlayed ? 'Show upcoming games' : 'Show previous games' }}
    </Button>
    <div
      v-if="showSearch"
      class="search"
    >
      <label for="name">Filter by team</label>
      <InputText
        class="searchInput"
        id="name"
        type="text"
        v-model="team"
        @change="$event => emit('search', ($event.target as HTMLInputElement)?.value)"
      />
    </div>
  </div>
</template>
<style lang="css" scoped>
.filters {
  display: flex;
  gap: 1rem;
}

.search {
  display: flex;
  gap: 0.5rem;
}

.searchInput {
  height: 2rem;
}

.button {
  width: max-content;
  margin-bottom: 1rem;
  background-color: var(--color-background-contrast);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: var(--color-text-contrast);
}
</style>