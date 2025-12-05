<template>
  <div class="pagination-wrapper">
    <div class="pagination-info">
      <span>
        Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
      </span>
    </div>

    <div class="pagination-controls">
      <button
        class="pagination-btn"
        :disabled="pagination.current_page === 1"
        @click="emit('changePage', pagination.current_page - 1)"
      >
        Previous
      </button>

      <div class="pagination-pages">
        <button
          v-for="page in visiblePages"
          :key="page"
          class="pagination-btn"
          :class="{ active: page === pagination.current_page }"
          @click="emit('changePage', page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="pagination-btn"
        :disabled="pagination.current_page === pagination.last_page"
        @click="emit('changePage', pagination.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '@/types/employee.types'
import { computed } from 'vue'

const props = defineProps<{
  pagination: PaginationMeta
}>()

const emit = defineEmits<{
  changePage: [page: number]
}>()

const visiblePages = computed(() => {
  const current = props.pagination.current_page
  const last = props.pagination.last_page
  const delta = 2
  const pages: number[] = []

  const rangeStart = Math.max(1, current - delta)
  const rangeEnd = Math.min(last, current + delta)

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 16px 0;
  border-top: 1px solid #e5e7eb;
}

.pagination-info {
  color: #6b7280;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pagination-pages {
  display: flex;
  gap: 4px;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;
}

.pagination-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #d1d5db;
}

.pagination-btn.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
