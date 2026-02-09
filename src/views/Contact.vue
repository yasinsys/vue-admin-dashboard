<template>
  <div class="p-4" style="max-width:600px">
    <h3>Contact Us</h3>

    <form @submit.prevent="submitForm" novalidate>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          v-model.trim="form.name"
          class="form-control"
          :class="{ 'is-invalid': submitted && !form.name }"
        />
        <div class="invalid-feedback">Name is required</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model.trim="form.email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && !isValidEmail }"
        />
        <div class="invalid-feedback">Enter a valid email</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea
          v-model.trim="form.message"
          class="form-control"
          rows="4"
          :class="{ 'is-invalid': submitted && !form.message }"
        ></textarea>
        <div class="invalid-feedback">Message is required</div>
      </div>

      <button class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send' }}
      </button>

      <p v-if="success" class="text-success mt-3">
        Message sent successfully ✅
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useToastStore } from '../store/toastStore'

const toast = useToastStore()

const success = ref(false)
const loading = ref(false)
const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isValidEmail = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
)

function submitForm() {
  submitted.value = true
  success.value = false

  if (!form.name || !isValidEmail.value || !form.message) {
    toast.show('Please fill all fields correctly', 'danger')
    return
  }

  loading.value = true

  // simulate API call
  setTimeout(() => {
    toast.show('Message sent successfully')
    success.value = true
    loading.value = false
    submitted.value = false

    form.name = ''
    form.email = ''
    form.message = ''
  }, 1000)
}
</script>
