<template>
  <div
    class="modal fade show d-block"
    tabindex="-1"
    style="background: rgba(0,0,0,.5)"
  >
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- HEADER -->
        <div class="modal-header">
          <h5 class="modal-title">
            {{ title }}
          </h5>
          <button class="btn-close" @click="close"></button>
        </div>

        <!-- BODY -->
        <div class="modal-body">

          <!-- DELETE CONFIRM -->
          <div v-if="isDelete">
            <p>
              Are you sure you want to delete
              <strong>{{ localUser.name }}</strong>?
            </p>
          </div>

          <!-- ADD / EDIT FORM -->
          <div v-else>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input
                v-model="localUser.name"
                type="text"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                v-model="localUser.email"
                type="email"
                class="form-control"
              />
            </div>
          </div>

        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="close">
            Cancel
          </button>

          <button
            v-if="isDelete"
            class="btn btn-danger"
            @click="confirmDelete"
          >
            Delete
          </button>

          <button
            v-else
            class="btn btn-primary"
            @click="save"
          >
            {{ isEdit ? 'Update' : 'Save' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'

/* PROPS */
const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  },
  formStatus: {
    type: String,
    default: ''
  }
})

/* EMITS */
const emit = defineEmits(['save', 'delete', 'close'])

/* LOCAL STATE */
const localUser = reactive({
  id: null,
  name: '',
  email: ''
})

/* WATCH USER */
watch(
  () => props.user,
  (u) => {
    if (u) Object.assign(localUser, u)
  },
  { immediate: true }
)

/* COMPUTED STATES */
const isEdit = computed(() => props.formStatus === 'edit')
const isDelete = computed(() => props.formStatus === 'delete')

const title = computed(() => {
  if (isDelete.value) return 'Delete User'
  if (isEdit.value) return 'Edit User'
  return 'Add User'
})

/* ACTIONS */
function save() {
  emit('save', { ...localUser })
}

function confirmDelete() {
  emit('delete', { ...localUser })
}

function close() {
  emit('close')
}
</script>
