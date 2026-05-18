<template>
  <main class="mainContainer">
    <section class="mainSection">
      <slot></slot>
    </section>
  </main>
</template>

<style scoped>
.mainContainer {
  display: grid;
  width: 100%;
  gap: 1rem;
  padding: 0 0 1rem 0;
  height: calc(100vh - 105px);
  margin: 0 auto;
  overflow: auto;
}

.mainSection {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
}
</style>
