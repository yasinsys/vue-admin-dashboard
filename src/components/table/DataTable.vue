<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th style="width: 60px">#</th>

          <th
            tabindex="0"
            role="button"
            @click="sortBy('name')"
            @keydown.enter.prevent="sortBy('name')"
            @keydown.space.prevent="sortBy('name')"
            :class="['sortable', isActive('name') && 'active-sort']"
            :aria-sort="ariaSort('name')"
          >
            Name
            <span class="sort-icon" :class="iconClass('name')">
              {{ sortIcon('name') }}
            </span>
          </th>

          <th
            tabindex="0"
            role="button"
            @click="sortBy('email')"
            @keydown.enter.prevent="sortBy('email')"
            @keydown.space.prevent="sortBy('email')"
            :class="['sortable', isActive('email') && 'active-sort']"
            :aria-sort="ariaSort('email')"
          >
            Email
            <span class="sort-icon" :class="iconClass('email')">
              {{ sortIcon('email') }}
            </span>
          </th>

          <th style="width: 160px">Actions</th>
        </tr>
      </thead>

      <tbody>
        <!-- 🔄 Skeleton Loader -->
        <tr v-if="loading" v-for="n in perPage" :key="'skeleton-'+n">
          <td colspan="4">
            <div class="skeleton-row"></div>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-else-if="!sortedItems.length">
          <td colspan="4" class="text-center text-muted py-4">
            No users found
          </td>
        </tr>

        <!-- Data Rows -->
        <tr
          v-else
          v-for="(user, index) in sortedItems"
          :key="user.id"
        >
          <td>
            {{ (page - 1) * perPage + index + 1 }}
          </td>

          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>

          <td>
            <button
              class="btn btn-sm btn-warning me-2"
              :disabled="!canEdit"
              @click="$emit('edit', user)"
            >
              Edit
            </button>

            <button
              class="btn btn-sm btn-danger"
              :disabled="!canDelete"
              @click="$emit('delete', user)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  canEdit: Boolean,
  canDelete: Boolean
})

defineEmits(['edit', 'delete'])

/* SORT STATE */
const sortKey = ref('')
const sortOrder = ref('asc')

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

function sortIcon(key) {
  if (sortKey.value !== key) return '⇅'
  return sortOrder.value === 'asc' ? '▲' : '▼'
}

function isActive(key) {
  return sortKey.value === key
}

function iconClass(key) {
  if (sortKey.value !== key) return ''
  return sortOrder.value === 'asc' ? 'rotate-up' : 'rotate-down'
}

function ariaSort(key) {
  if (sortKey.value !== key) return 'none'
  return sortOrder.value === 'asc' ? 'ascending' : 'descending'
}

const sortedItems = computed(() => {
  if (!sortKey.value) return props.items

  return [...props.items].sort((a, b) => {
    const valA = a[sortKey.value]?.toLowerCase()
    const valB = b[sortKey.value]?.toLowerCase()

    if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})
</script>

<style scoped>
.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  outline: none;
}

.sortable:hover,
.sortable:focus {
  background-color: #f1f3f5;
}

/* 🔥 Active column */
.active-sort {
  background-color: #e7f1ff;
  font-weight: 600;
}

/* ICON */
.sort-icon {
  display: inline-block;
  margin-left: 6px;
  font-size: 0.75rem;
  color: #0d6efd;
  transition: transform 0.25s ease;
}

.rotate-up {
  transform: rotate(0deg);
}

.rotate-down {
  transform: rotate(360deg);
}

/* 🦴 Skeleton */
.skeleton-row {
  height: 20px;
  width: 100%;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #e9ecef 25%,
    #f8f9fa 37%,
    #e9ecef 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.2s ease infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
