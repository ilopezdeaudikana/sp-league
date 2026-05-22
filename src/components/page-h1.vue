<template>
  <h1 class="h1">
    <slot />
  </h1>
</template>

<style scoped>
.h1 {
  display: inline-flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: var(--color-text);
  width: max-content;
  margin: 0 auto;
  align-items: center;
  padding: 1rem 0;
}
</style>
