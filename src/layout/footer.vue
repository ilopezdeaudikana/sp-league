<script lang="ts" setup>
import { VersionService } from '@/services/version-service'
import { onMounted, ref } from 'vue'

const version = ref('')

onMounted(() => {
  version.value = VersionService.getVersion() ?? ''
})
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
