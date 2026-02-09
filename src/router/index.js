import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Contact from '../views/Contact.vue'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'dashboard',
          component: Dashboard
        },
        {
          path: 'users',
          component: Users
        },
        { path: 'contact', component: Contact }
      ]
    }
  ]
})

export default router
