<template>
  <div class="employee-list-container">
    <div class="list-header">
      <h2 class="list-title">Employees</h2>
      <div class="search-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search employees..."
          class="search-input"
          @input="handleSearch"
        />
        <svg
          class="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <EmployeeSkeleton v-if="loading" :rows="10" />

    <div v-else-if="error" class="error-state">
      <svg
        class="error-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3>Failed to load employees</h3>
      <p>{{ error }}</p>
      <button class="retry-btn" @click="handleRetry">Try Again</button>
    </div>

    <div v-else-if="employees.length === 0" class="empty-state">
      <svg
        class="empty-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3>No employees found</h3>
      <p>Try adjusting your search criteria</p>
    </div>

    <div v-else class="employee-table">
      <div v-for="employee in employees" :key="employee.id" class="employee-row">
        <div class="employee-info">
          <h4 class="employee-name">{{ employee.name }}</h4>
          <p class="employee-email">{{ employee.email }}</p>
        </div>

        <div class="employee-department">
          <span class="department-badge">{{ employee.department }}</span>
        </div>
      </div>
    </div>

    <EmployeePagination
      v-if="employees.length > 0"
      :pagination="pagination"
      @change-page="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EmployeePagination from './EmployeePagination.vue'
import type { Employee, PaginationMeta } from '@/types/employee.types'

const { employees, loading, pagination, error } = defineProps<{
  employees: Employee[]
  loading: boolean
  pagination: PaginationMeta
  error: string | null
}>()

const emit = defineEmits<{
  search: [query: string]
  changePage: [page: number]
  retry: []
}>()

const searchQuery = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function handleSearch() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    emit('search', searchQuery.value)
  }, 400)
}

function handlePageChange(page: number) {
  emit('changePage', page)
}

function handleRetry() {
  emit('retry')
}
</script>

<style scoped>
.employee-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.list-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.search-wrapper {
  position: relative;
  width: 320px;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.employee-table {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.employee-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
}

.employee-row:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.employee-avatar {
  flex-shrink: 0;
}

.employee-avatar img,
.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
}

.employee-info {
  flex: 1;
  min-width: 0;
}

.employee-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.employee-email {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.employee-department {
  flex-shrink: 0;
}

.department-badge {
  display: inline-block;
  padding: 6px 12px;
  background: #eff6ff;
  color: #1e40af;
  font-size: 13px;
  font-weight: 500;
  border-radius: 16px;
}

.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
}

.error-icon,
.empty-icon {
  width: 64px;
  height: 64px;
  color: #9ca3af;
  margin-bottom: 16px;
}

.error-state h3,
.empty-state h3 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.error-state p,
.empty-state p {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
}

.retry-btn {
  padding: 10px 20px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #2563eb;
}
</style>
