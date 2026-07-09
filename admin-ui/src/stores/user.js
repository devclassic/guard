import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const user = ref({})
    return { token, user }
  },
  { persist: true },
)
