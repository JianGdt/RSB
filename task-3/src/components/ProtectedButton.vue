<script setup lang="ts">
import { usePermission } from "../composables/usePermission";
import type { Permission } from "../composables/usePermission";

interface Props {
  permission: Permission;
  label: string;
}

const props = defineProps<Props>();

const { can } = usePermission();
</script>

<template>
  <button v-if="can(props.permission)" class="btn">
    {{ props.label }}
  </button>
</template>

<style scoped>
.btn {
  padding: 8px 14px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background: #2563eb;
}
</style>
