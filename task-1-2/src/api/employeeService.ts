import type { EmployeeFilters, EmployeesApiResponse } from '@/types/employee.types'
import { retryWithDelay } from '@/utils/fetchRetry'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const employeeApi = {
  async getEmployees(filters: EmployeeFilters): Promise<EmployeesApiResponse> {
    const params = new URLSearchParams({
      search: filters.search,
      page: filters.page.toString(),
      per_page: filters.per_page.toString(),
    })

    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/employees?${params}`, {
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${text}`)
      }

      return response.json()
    }

    return retryWithDelay(fetchData, 3, 1000)
  },
}
