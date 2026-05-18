<script lang="ts" setup>
interface FiltersProps {
  matchPlayed?: boolean
}

interface FiltersEmits {
  'match-payed': [boolean]
}

const props = defineProps<FiltersProps>()

const emit = defineEmits<FiltersEmits>()

const handlePlayedMatches = () => {
  emit('match-payed', !props.matchPlayed)
}
</script>
<template>
  <button
    class="button"
    @click="handlePlayedMatches"
  >
    {{ matchPlayed ? 'Show upcoming games' : 'Show previous games' }}
  </button>
</template>
<style lang="css" scoped>
.button {
  width: max-content;
  margin-bottom: 1rem;
  background-color: var(--vt-c-indigo-faded);
  border: 1px solid var(--vt-c-indigo);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: var(--vt-c-white-soft);
}
</style>