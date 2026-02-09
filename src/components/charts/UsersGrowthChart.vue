<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">User Growth</h5>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

const chartCanvas = ref(null)
let chartInstance = null


onMounted(() => {
  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Users',
          data: [120, 190, 300, 450, 620, 820],
          borderWidth: 2,
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})

onBeforeUnmount(() => {
  chartInstance?.destroy()
})
</script>

<style scoped>
canvas {
  height: 280px !important;
}
</style>
