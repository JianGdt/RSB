<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search employees..."
      class="search-input"
      @input="handleSearch"
    />
    <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
  debounce?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
}>()

const searchQuery = ref(props.modelValue ?? '')

let timeoutId: number | undefined

const handleSearch = () => {
  emit('update:modelValue', searchQuery.value)

  if (timeoutId) clearTimeout(timeoutId)

  timeoutId = window.setTimeout(() => {
    emit('search', searchQuery.value)
  }, props.debounce ?? 400)
}

watch(
  () => props.modelValue,
  (newValue) => {
    searchQuery.value = newValue ?? ''
  },
)
</script>

<style scoped>
.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  color: #000;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
}

.search-input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  transform: translateY(-50%);
}
</style>
