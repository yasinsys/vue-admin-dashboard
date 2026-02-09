<template>
  <aside
    class="sidebar"
    :class="[
      theme.isDark ? 'sidebar-dark' : 'sidebar-light',
      ui.sidebarCollapsed ? 'collapsed' : ''
    ]"
  >
    <ul class="nav nav-pills flex-column gap-1">
      <li class="nav-item">
        <RouterLink to="/dashboard" class="nav-link" active-class="active-link">
          <span class="icon">📊</span>
          <span v-if="!ui.sidebarCollapsed" class="label">Dashboard</span>
        </RouterLink>
      </li>
      <li class="nav-item" v-if="auth.isAdmin">
        <RouterLink to="/users" class="nav-link" active-class="active-link">
          <span class="icon">👤</span>
          <span v-if="!ui.sidebarCollapsed" class="label">Users</span>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/contact" class="nav-link" active-class="active-link">
          <span class="icon">📞</span>
          <span v-if="!ui.sidebarCollapsed" class="label">Contact Us</span>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useThemeStore } from '../../store/themeStore'
import { useUIStore } from '../../store/uiStore'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../store/authStore' 
const theme = useThemeStore()
const ui = useUIStore()
const auth = useAuthStore() 
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  padding: 12px;
  transition: width 0.25s ease, background-color 0.25s ease;
  overflow: hidden;
}

/* COLLAPSED */
.sidebar.collapsed {
  width: 64px;
}

/* ICONS */
.icon {
  font-size: 1.2rem;
}

.label {
  margin-left: 10px;
  white-space: nowrap;
}

/* LIGHT MODE */
.sidebar-light {
  background-color: #f8f9fa;
}

.sidebar-light .nav-link {
  color: #212529;
}

/* DARK MODE */
.sidebar-dark {
  background-color: #1e1e1e;
}

.sidebar-dark .nav-link {
  color: #dee2e6;
}

/* ACTIVE */
.active-link {
  background-color: #0d6efd !important;
  color: #fff !important;
  border-radius: 6px;
}
</style>
