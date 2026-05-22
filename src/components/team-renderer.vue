<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  name: string
  post: boolean
}
const props = defineProps<Props>()

const imagePath = computed(() => `https://flagsapi.codeaid.io/${props.name}.png`)
</script>

<template>
  <div :class="{ wrapper: true, post: post, pre: !post }">
    <img v-if="!post" class="flag" :src="imagePath" :alt="name" />
    <span class="name" v-html="name" />
    <img v-if="post" class="flag" :src="imagePath" :alt="name" />
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  align-items: center;  
}

.pre {
  grid-template-columns: 4rem 6rem;
}

.post { 
  grid-template-columns: 6rem 4rem;
}
.name {
  font-weight: bold;
  font-size: 1rem;
}

.flag {
  display: inline-block;
  width: 3.25rem;
  height: 2.25rem;
  border: 1px solid;
  border-radius: 0.5rem;
  border-color: var(--color-border);
  box-shadow: var(--shadow-elevated);
}
</style>
