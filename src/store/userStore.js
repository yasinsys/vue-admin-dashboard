import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUsers } from '../services/api'

export const useUserStore = defineStore('users', () => {
  /* INITIAL USERS */
  const users = ref(
    getUsers().map(u => ({
      ...u,
      createdAt: u.createdAt || new Date() // fallback for old data
    }))
  )

  /* GETTERS */
  const totalUsers = computed(() => users.value.length)

  /* ACTIONS */
  const addUser = (user) => {
    users.value.unshift({
      ...user,
      id: Date.now(),
      createdAt: new Date().toISOString()
    })
  }


  const updateUser = (user) => {
    users.value = users.value.map(u =>
      u.id === user.id ? { ...u, ...user } : u
    )
  }

  const deleteUser = (id) => {
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    totalUsers,
    addUser,
    updateUser,
    deleteUser
  }
})
