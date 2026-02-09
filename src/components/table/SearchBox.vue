<template>
  <input
    type="text"
    class="form-control mb-3"
    placeholder="Search by name or email..."
    v-model="modelValue"
    @input="$emit('update:modelValue', modelValue)"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String
})

const modelValue = ref(props.modelValue)

watch(() => props.modelValue, v => modelValue.value = v)
</script>