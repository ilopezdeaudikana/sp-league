<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useVersionStore } from '../stores/version'
const store = useVersionStore()
const { version } = storeToRefs(store)

</script>

<template>
  <div class="footer">
    <div class="v">Version: {{ version }}</div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #f6f7f7;
  height: 40px;
  width: 100%;
}

.v {
  padding: 10px;
}
</style>
