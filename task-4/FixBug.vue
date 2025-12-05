<template>
  <div v-for="emp in employees" :key="emp.id">
    {{ emp.full_name }}
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const search = ref("");
const employees = ref([]);

watch(
  search,
  async () => {
    try {
      const res = await fetch(`/api/employees?search=${encodeURIComponent(search.value)}`);

      if (!res.ok) {
        throw new Error("Network error");
      }

      const data = await res.json(); 

      employees.value = data;
    } catch (err) {
      console.error("Failed to load employees:", err);
      employees.value = []; 
    }
  },
  { immediate: true }
);
</script>



<!-- -- Fix --                               
Use `await res.json()`          
Add `{ immediate: true }`       
Use try/catch and check `res.ok` to handle errors use try/catch
Use `encodeURIComponent()`      
 -->
