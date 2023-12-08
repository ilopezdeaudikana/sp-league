import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useVersionStore = defineStore('apiVersionStore', () => {
  const version = ref<string>('')
  const setVersion = (newVersion: string) => {
    version.value = newVersion
  }

  return { version, setVersion }
})
