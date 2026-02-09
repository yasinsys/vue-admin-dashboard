import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const role = ref(localStorage.getItem('role') || 'viewer')
  const user = ref(localStorage.getItem('user') || 'user')
  const isAdmin = computed(() => role.value === 'admin')

  function setRole(newRole) {
    role.value = newRole
    localStorage.setItem('role', newRole)
  }

  function setUser(newUser) {
    user.value = newUser
    localStorage.setItem('user', newUser)
  }

  function logout() {
    role.value = 'viewer'
    localStorage.removeItem('auth')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
  }

  return {
    role,
    isAdmin,
    setRole,
    setUser,
    logout,
    user
  }
})
