export interface Employee {
  id: number
  name: string
  email: string
  department: string
  position?: string
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  last_page: number
  from: number
  to: number
}

export interface EmployeesApiResponse {
  data: Employee[]
  meta: PaginationMeta
}

export interface EmployeeFilters {
  search: string
  page: number
  per_page: number
}
