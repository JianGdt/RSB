import { employeeApi } from '@/api/employeeService'
import type { Employee, PaginationMeta } from '@/types/employee.types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref<Employee[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref<PaginationMeta>({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  })

  const hasEmployees = computed(() => employees.value.length > 0)
  const hasError = computed(() => error.value !== null)

  async function getEmployees(search: string = '', page: number = 1) {
    loading.value = true
    error.value = null

    try {
      const response = await employeeApi.getEmployees({
        search,
        page,
        per_page: pagination.value.per_page,
      })

      employees.value = response.data
      pagination.value = response.meta
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch employees'
      console.error('Error fetching employees:', err)

      employees.value = []
    } finally {
      loading.value = false
    }
  }

  function setPerPage(perPage: number) {
    pagination.value.per_page = perPage
  }

  function clearError() {
    error.value = null
  }

  function resetStore() {
    employees.value = []
    loading.value = false
    error.value = null
    pagination.value = {
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1,
      from: 0,
      to: 0,
    }
  }

  return {
    employees,
    loading,
    error,
    pagination,
    hasEmployees,
    hasError,
    getEmployees,
    setPerPage,
    clearError,
    resetStore,
  }
})
