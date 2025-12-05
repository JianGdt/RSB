<template>
  <div class="table-container">
    <table class="employee-table">
      <thead class="table-head">
        <tr>
          <th class="header-cell">Name</th>
          <th class="header-cell">Email</th>
          <th class="header-cell">Department</th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr v-for="employee in employees" :key="employee.id" class="table-row">
          <td class="body-cell name-cell">{{ employee.name }}</td>
          <td class="body-cell">{{ employee.email }}</td>
          <td class="body-cell">{{ employee.department }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '@/types/employee.types'

defineProps<{
  employees: Employee[]
}>()
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.employee-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.employee-table > thead > tr > th,
.employee-table > tbody > tr > td {
  border-bottom: 1px solid #d1d5db;
}

.table-head {
  background-color: #f9fafb;
}

.header-cell {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-body {
  background: #ffffff;
}

.table-body > tr > td {
  border-bottom: 1px solid #e5e7eb;
}

.table-row {
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f9fafb;
}

.body-cell {
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: #6b7280;
}

.name-cell {
  color: #111827;
  font-weight: 500;
}
</style>
