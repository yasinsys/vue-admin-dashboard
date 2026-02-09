<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h6>{{ title }}</h6>
      <h3>{{ value }}</h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number]
})
</script>
