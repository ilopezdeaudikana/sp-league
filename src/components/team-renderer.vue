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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.pre {
  justify-content: flex-start;
  .flag {
    margin-right: 10px;
  }
}

.post { 
  .flag {
    margin-left: 10px;
  }
}
.name {
  font-weight: bold;
  font-size: 16px;
}
.flag {
  display: inline-block;
  width: 53px;
  height: 37px;
}
</style>
