<template>
  <div class="d-flex gap-2 mb-3">
    <button class="btn btn-outline-success btn-sm" @click="exportExcel">
      📗 Export Excel
    </button>

    <button class="btn btn-outline-primary btn-sm" @click="exportCSV">
      📄 Export CSV
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from '../../store/userStore'
import { exportToCSV } from '../../utils/exportCSV'
import { exportToExcel } from '../../utils/exportExcel'

const userStore = useUserStore()

function exportCSV() {
  exportToCSV(userStore.users)
}

function exportExcel() {
  exportToExcel(userStore.users)
}
</script>
