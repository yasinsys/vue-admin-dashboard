import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  watch(isDark, (val) => {
    document.body.classList.toggle('dark-mode', val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
  }, { immediate: true })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
})
