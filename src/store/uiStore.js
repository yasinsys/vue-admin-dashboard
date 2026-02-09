// src/store/uiStore.js
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    sidebarCollapsed: false
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  },
  persist: true // optional (if using pinia-plugin-persistedstate)
})
