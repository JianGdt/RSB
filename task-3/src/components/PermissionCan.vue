<script setup lang="ts">
import { usePermission } from "../composables/usePermission";

const { can } = usePermission();
</script>

<template>
  <div class="box">
    <h3>Permission</h3>
    <p>Can Edit? <strong>{{ can('edit_article') }}</strong></p>
  </div>
</template>

<style scoped>
.box {
  background: #f4f4f4;
  padding: 12px;
  border-radius: 6px;
}
</style>
