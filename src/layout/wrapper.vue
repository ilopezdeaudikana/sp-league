<script lang="ts" setup></script>

<template>
  <div class="container">
    <main class="body">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
}
.body {
  display: flex;
  flex-direction: column;
  max-width: 90%;
  flex: 1;
}

</style>
