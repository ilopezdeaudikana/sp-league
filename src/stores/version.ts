import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useVersionStore = defineStore('version', () => {
  const version = ref<string>('')
  function setVersion(newVersion: string) {
    version.value = newVersion
  }

  return { version, setVersion }
})
