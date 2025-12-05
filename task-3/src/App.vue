<script setup lang="ts">
import PermissionCan from "./components/PermissionCan.vue";
import ProtectedPage from "./components/ProtectedPage.vue";
import { setUserPermissions } from "./composables/usePermission";

setUserPermissions(["read_article", "edit_article"]);
</script>

<template>
  <div>
    <h1>Task 3: Permission-Based UI Rendering</h1>

    <ProtectedPage />
    <PermissionCan />
  </div>
</template>

<style scoped>
h1 {
  font-size: 28px;
  margin-bottom: 20px;
}
</style>
