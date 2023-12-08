<script lang="ts" setup>
</script>

<template>
  <div class="wrapper">
    <h1 class="h1">
      <slot />
    </h1>
  </div>
</template>

<style scoped>

.wrapper {
  display: flex;
  flex: 1;
  justify-content: center;
}
.h1 {
  font-size: 24px;
  color: #182c62;
  margin: 60px 0 20px 0;
  width: max-content;
}
</style>
