<template>
  <div class="p-4">
    <div class="d-flex justify-content-between mb-3">
      <h3>Users</h3>
      <button
        v-if="auth.isAdmin"
        class="btn btn-primary"
        @click="openAdd"
      >
        + Add User
      </button>

    </div>

    <SearchBox v-model="search" />
<ExportButtons />
    <DataTable
      :items="paginatedUsers"
      :page="page"
      :perPage="perPage"
      :loading="false"
      :canEdit="auth.isAdmin"
  :canDelete="auth.isAdmin"
      @edit="openEdit"
      @delete="deleteConfirm"
    />

    <Pagination
      :page="page"
      :totalPages="totalPages"
      @change="changePage"
    />

    <UserForm
      :user="selectedUser"
      :formStatus="formStatus"
      @save="saveUser"
      @delete="deleteUser"
      @close="closeForm"
      v-if="showForm && auth.isAdmin"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ExportButtons from '../components/common/ExportButtons.vue'
import DataTable from '../components/table/DataTable.vue'
import Pagination from '../components/table/Pagination.vue'
import SearchBox from '../components/table/SearchBox.vue'
import UserForm from '../components/users/UserForm.vue'

import { useUserStore } from '../store/userStore'
import { useToastStore } from '../store/toastStore'
import { useAuthStore } from '../store/authStore'

const auth = useAuthStore()
const userStore = useUserStore()
const toast = useToastStore()

const page = ref(1)
const perPage = 10
const search = ref('')
const showForm = ref(false)
const formStatus = ref('')
const selectedUser = ref({})

const users = computed(() => userStore.users)

/* CRUD */
function openAdd() {
  selectedUser.value = { name: '', email: '' }
  formStatus.value = 'add'
  showForm.value = true
}

function openEdit(user) {
  selectedUser.value = { ...user }
  formStatus.value = 'edit'
  showForm.value = true
}

function deleteConfirm(user) {
  selectedUser.value = { ...user }
  formStatus.value = 'delete'
  showForm.value = true
}

function saveUser(user) {
  if (formStatus.value === 'edit') {
    userStore.updateUser(user)
    toast.show('User updated successfully')
  } else {
    userStore.addUser(user)
    toast.show('User added successfully')
  }
  closeForm()
}

function deleteUser(user) {
  userStore.deleteUser(user.id)
  toast.show('User deleted', 'warning')
  closeForm()
}

function closeForm() {
  showForm.value = false
  formStatus.value = ''
  selectedUser.value = {}
}

/* FILTER + PAGINATION */
const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u =>
    u.name.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / perPage)
)

const paginatedUsers = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredUsers.value.slice(start, start + perPage)
})

function changePage(p) {
  if (p >= 1 && p <= totalPages.value) page.value = p
}

watch(search, () => (page.value = 1))
</script>
