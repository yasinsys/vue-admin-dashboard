<template>
  <div class="d-flex">
    <Sidebar />

    <div class="flex-fill main-content">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
import Navbar from '../components/layout/Navbar.vue'
</script>

<style scoped>
.main-content {
  min-height: 100vh;
}
</style>