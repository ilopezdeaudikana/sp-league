<script lang="ts" setup>
defineProps<{ version: string }>()
</script>

<template>
  <div class="footer">
    <div class="v">Version: {{ version }}</div>
  </div>
</template>

<style scoped>
.footer {
  background-color: var(--color-background-soft);
  height: 40px;
  width: 100%;
}

.v {
  padding: 10px;
}
</style>
