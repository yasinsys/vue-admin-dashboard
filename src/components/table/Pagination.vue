
<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{disabled: page===1}">
        <button class="page-link" @click="$emit('change', page-1)">Prev</button>
      </li>

      <li class="page-item"
          v-for="p in totalPages"
          :key="p"
          :class="{active: p===page}">
        <button class="page-link" @click="$emit('change', p)">{{ p }}</button>
      </li>

      <li class="page-item" :class="{disabled: page===totalPages}">
        <button class="page-link" @click="$emit('change', page+1)">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  page: Number,
  totalPages: Number
})
</script>
