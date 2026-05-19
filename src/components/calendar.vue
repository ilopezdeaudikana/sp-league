<script lang="ts" setup>
import type { ApiMatch } from '@/types/match'
import { computed } from 'vue'
import TeamRenderer from './team-renderer.vue'
import { toCustomDateFormat } from '@/utils/toCustomDate'

interface CalendarProps {
  matches: ApiMatch[]
  matchDates: Date[]
}
const { matches, matchDates } = defineProps<CalendarProps>()

const getDaysBetween = (d1: number, d2: number): number => {

  const diffInMs = Math.abs(d2 - d1)

  const msInDay = 1000 * 60 * 60 * 24

  return Math.round(diffInMs / msInDay)
}
const appendZero = (n: number) => {
  const num = n.toString()
  if (num.length === 1) return `0${num}`
  else return num
}
const getTime = (n: number) => {
  const d = new Date(n)
  return `${appendZero(d.getHours())}:${appendZero(d.getMinutes())}`
}

const normalizeDate = (date: number) => {
  const d = new Date(date)
  // normalize to same day
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}
const matchesByDate = computed<Partial<Record<number, ApiMatch[]>>>(() => Object.groupBy(matches, ({ matchDate }) => normalizeDate(matchDate)))

const dates = computed(() => {
  const firstDate = normalizeDate(matchDates[0].getTime())
  const lastDate = normalizeDate(matchDates[matchDates.length - 1].getTime())
  const daysDiff = getDaysBetween(firstDate, lastDate)
  const days = Array(daysDiff).fill(1)

  return [
    firstDate,
    ...days.map((_, index) => {
      const toDate = new Date(firstDate)
      return toDate.setDate(toDate.getDate() + (index + 1))
    }),
    lastDate
  ]
})

</script>
<template>
  <section class="calendar">
    <div
      v-for="day in dates"
      :key="day"
      class="day"
    >
      <p :class="{
        date: true,
        full: matchesByDate[day]?.length,
        empty: !matchesByDate[day]?.length
      }"
      >
        {{ toCustomDateFormat(day).replace('00:00', '') }}
      </p>
      <div
        v-for="value in matchesByDate[day]"
        :key="value.homeTeam + value.awayTeam"
        class="match"
      >
        <p>{{ getTime(value.matchDate) }}</p>
        <TeamRenderer
          :name="value.homeTeam"
          :post="false"
        />
        <p class="score">{{ value.matchPlayed ? `${value.homeTeamScore} : ${value.awayTeamScore}` : '- : -' }}</p>
        <TeamRenderer
          :name="value.awayTeam"
          post
        />
      </div>
    </div>
  </section>
</template>
<style lang="css" scoped>
.calendar {
  align-self: center;
}
.day {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  width: 32rem;
}

.date {
  width: 100%;
  text-align: center;
}
.empty {
  background-color: var(--vt-c-text-dark-2);
}

.full {
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white-soft);
}

.match {
  display: grid;
  grid-template-columns: 3rem 10rem 4rem 10rem;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
}

.score {
  text-align: center;
}
</style>
