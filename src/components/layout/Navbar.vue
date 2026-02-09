<template>
  <nav
    class="navbar px-3 d-flex align-items-center"
    :class="theme.isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'"
  >
    <button
      class="btn btn-sm btn-outline-primary me-2"
      @click="toggleMenu"
      title="Toggle Sidebar"
    >
      ☰
    </button>

    <span class="navbar-brand">Vue Admin</span>

    <div class="ms-auto d-flex gap-2">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="theme.toggleTheme"
      >
        {{ theme.isDark ? '☀ Light' : '🌙 Dark' }}
      </button>

      <button class="btn btn-sm btn-danger" @click="logout">
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useThemeStore } from '../../store/themeStore'
import { useUIStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'
const router = useRouter()
const theme = useThemeStore()
const ui = useUIStore()
const auth = useAuthStore()

function toggleMenu() {
  if (window.innerWidth < 768) {
    ui.openMobileSidebar()
  } else {
    ui.toggleSidebar()
  }
}

function logout() {
  localStorage.removeItem('auth')
  auth.logout()
  router.push('/login')
}
</script>
