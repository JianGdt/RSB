<template>
  <div class="employees-view">
    <EmployeeList
      :employees="employeeStore.employees"
      :loading="employeeStore.loading"
      :pagination="employeeStore.pagination"
      :error="employeeStore.error"
      @search="handleSearch"
      @change-page="handlePageChange"
      @retry="handleRetry"
    />
  </div>
</template>

<script setup lang="ts">
import EmployeeList from '@/components/EmployeeList.vue'
import { useEmployeeStore } from '@/stores/useEmployeeStore'
import { onMounted, ref } from 'vue'

const employeeStore = useEmployeeStore()
const currentSearch = ref('')

onMounted(() => {
  loadEmployees()
})

async function loadEmployees() {
  await employeeStore.getEmployees(currentSearch.value, employeeStore.pagination.current_page)
}

async function handleSearch(query: string) {
  currentSearch.value = query
  await employeeStore.getEmployees(query, 1)
}

async function handlePageChange(page: number) {
  await employeeStore.getEmployees(currentSearch.value, page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function handleRetry() {
  await loadEmployees()
}
</script>

<style scoped>
.employees-view {
  min-height: 100vh;
  background: #f9fafb;
  padding: 24px 0;
}
</style>
