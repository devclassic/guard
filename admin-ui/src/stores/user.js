import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const user = ref(null)
    return { token, user }
  },
  { persist: true },
)
