<template>
  <div class="p-4">

    <!-- Welcome -->
    <div class="mb-4">
      <h3>{{ greeting }}, {{auth.user}} 👋</h3>
      <p class="text-muted">
        Here’s what’s happening in your application today.
      </p>
    </div>

    <!-- STATS CARDS -->
    <div class="row g-3 mb-4">
      <div class="col-md-3" v-for="card in stats" :key="card.title">
        <div
          class="card shadow-sm h-100"
          :class="theme.isDark ? 'bg-dark text-light' : ''"
        >
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1">{{ card.title }}</h6>
              <h3 class="mb-0">{{ card.value }}</h3>
            </div>
            <div class="fs-2">{{ card.icon }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 mb-4">
        <UsersGrowthChart :usersPerMonth="usersPerMonth" />
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="row g-4">

      <!-- Recent Users -->
      <div class="col-lg-6">
        <div class="card shadow-sm h-100" :class="theme.isDark ? 'bg-dark text-light' : ''">
          <div class="card-header fw-semibold">
            Recent Users
          </div>
          <div class="card-body p-0">
            <table class="table mb-0" :class="theme.isDark ? 'table-dark' : ''">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(u, i) in recentUsers" :key="u.id">
                  <td>{{ i + 1 }}</td>
                  <td>{{ u.name }}</td>
                  <td>{{ u.email }}</td>
                </tr>
                <tr v-if="!recentUsers.length">
                  <td colspan="3" class="text-center text-muted py-3">
                    No users found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="col-lg-6">
        <div class="card shadow-sm h-100" :class="theme.isDark ? 'bg-dark text-light' : ''">
          <div class="card-header fw-semibold">
            Recent Activity
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0">
              <li
                v-for="(a, i) in activities"
                :key="i"
                class="mb-2"
              >
                <span class="me-2">{{ a.icon }}</span>
                {{ a.text }}
                <small class="text-muted d-block">{{ a.time }}</small>
              </li>
              <li v-if="!activities.length" class="text-muted">
                No recent activity
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <!-- QUICK ACTIONS -->
    <div class="card shadow-sm mt-4" :class="theme.isDark ? 'bg-dark text-light' : ''">
      <div class="card-body d-flex flex-wrap gap-2">
        <button class="btn btn-primary" @click="goUsers">
          ➕ Add User
        </button>
        <button class="btn btn-outline-secondary" @click="goUsers">
          👤 Manage Users
        </button>
        <button class="btn btn-outline-info" @click="goContact">
          ✉️ Contact Messages
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'
import { useThemeStore } from '../store/themeStore'
import UsersGrowthChart from '../components/charts/UsersGrowthChart.vue'
import { useAuthStore } from '../store/authStore'
const auth = useAuthStore()
const router = useRouter()
const userStore = useUserStore()
const theme = useThemeStore()

const usersPerMonth = computed(() => {
  const map = {}

  userStore.users.forEach(u => {
    const d = new Date(u.createdAt)
    const key = d.toLocaleString('default', {
      month: 'short',
      year: 'numeric'
    })

    map[key] = (map[key] || 0) + 1
  })

  return {
    labels: Object.keys(map),
    data: Object.values(map)
  }
})

/* GREETING */
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
})

/* STATS */
const stats = computed(() => [
  { title: 'Total Users', value: userStore.users.length, icon: '👤' },
  { title: 'Active Users', value: Math.max(userStore.users.length - 1, 0), icon: '🟢' },
  { title: 'Messages', value: 12, icon: '✉️' },
  { title: 'System Status', value: 'Online', icon: '✅' }
])

/* RECENT USERS */
const recentUsers = computed(() =>
  [...userStore.users].slice(-5).reverse()
)

/* ACTIVITY FEED (mock for now) */
const activities = computed(() => [
  { icon: '🟢', text: 'New user added', time: '2 minutes ago' },
  { icon: '🟡', text: 'User profile updated', time: '1 hour ago' },
  { icon: '🔴', text: 'User deleted', time: 'Yesterday' }
])

/* NAVIGATION */
function goUsers() {
  router.push('/users')
}

function goContact() {
  router.push('/contact')
}
</script>
