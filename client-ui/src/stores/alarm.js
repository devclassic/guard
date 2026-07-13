import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlarmStore = defineStore(
  'alarm',
  () => {
    const info = ref({})
    return { info }
  },
  { persist: true },
)
