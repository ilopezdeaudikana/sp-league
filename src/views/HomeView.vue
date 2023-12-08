<script setup lang="ts">
import CurrencyExchange from '../components/currency-exchange.vue'
</script>

<template>
  <main>
    <Suspense>
      <CurrencyExchange />
      <template #fallback> Loading... </template>
    </Suspense>
  </main>
</template>
