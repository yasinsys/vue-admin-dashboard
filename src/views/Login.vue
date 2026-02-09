<template>
  <div class="container mt-5" style="max-width:400px">
    <h3 class="mb-3">Login</h3>

    <!-- Username -->
    <input
      v-model="user"
      type="text"
      placeholder="Username"
      class="form-control mb-1"
      :class="{ 'is-invalid': userError }"
    />
    <div v-if="userError" class="invalid-feedback mb-2">
      {{ userError }}
    </div>

    <!-- Password -->
    <input
      v-model="pass"
      type="password"
      placeholder="Password"
      class="form-control mb-1"
      :class="{ 'is-invalid': passError }"
    />
    <div v-if="passError" class="invalid-feedback mb-2">
      {{ passError }}
    </div>

    <button
      class="btn btn-primary w-100"
      :disabled="!isValid"
      @click="login"
    >
      Login
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToastStore } from '../store/toastStore'
import { useAuthStore } from '../store/authStore'
const auth = useAuthStore()
const user = ref('')
const pass = ref('')
const router = useRouter()
const toast = useToastStore()

/* VALIDATION */
const userError = computed(() => {
  if (!user.value) return 'Username is required'
  if (user.value.length < 3) return 'Minimum 3 characters'
  return ''
})

const passError = computed(() => {
  if (!pass.value) return 'Password is required'
  if (pass.value.length < 6) return 'Minimum 6 characters'
  return ''
})

const isValid = computed(() => !userError.value && !passError.value)

/* LOGIN */
function login() {
  if (user.value && pass.value) {
    const role = user.value === 'admin' ? 'admin' : 'viewer'

    auth.setRole(role)      
    auth.setUser(user.value)
    localStorage.setItem('auth', 'true')

    router.push('/dashboard')
    
  }
  
}
</script>
