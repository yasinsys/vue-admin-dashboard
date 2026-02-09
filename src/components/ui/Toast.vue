<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast show align-items-center text-white mb-2"
      :class="toastClass(toast.type)"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ toast.message }}
        </div>
        <button
          class="btn-close btn-close-white me-2 m-auto"
          @click="remove(toast.id)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useToastStore } from '../../store/toastStore'

const toastStore = useToastStore()

const toasts = computed(() => toastStore.toasts)

function remove(id) {
  toastStore.removeToast(id)
}

function toastClass(type) {
  return {
    success: 'bg-success',
    error: 'bg-danger',
    info: 'bg-primary',
    warning: 'bg-warning text-dark'
  }[type] || 'bg-secondary'
}
</script>
