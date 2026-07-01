import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabbarStore = defineStore('tabbar', () => {
  const current = ref(0)
  return { current }
})
