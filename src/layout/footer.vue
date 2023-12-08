<script lang="ts" setup>
import { useVersionStore } from '../stores/version'
const store = useVersionStore()
</script>

<template>
  <div class="bar">
    <div class="version">Version: {{ store.version }}</div>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  background-color: #f6f7f7;
  height: 40px;
  position: fixed;
  bottom: env(safe-area-inset-bottom);
}

.version {
  padding-right: 20px;
}
</style>
