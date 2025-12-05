<script setup lang="ts">
import { usePermission } from "../composables/usePermission";

const { can, canAny, canAll } = usePermission();
</script>

<template>
  <div class="wrapper">
    <p v-if="can('edit_article')">✔ You can edit articles.</p>
    <p v-else>✖ You cannot edit articles.</p>

    <p v-if="canAny(['delete_article', 'publish_article'])">
      ✔ You have at least one high-level permission.
    </p>
    <p v-else>
      ✖ You have none of the high-level permissions.
    </p>

    <p v-if="canAll(['read_article', 'edit_article'])">
      ✔ You have ALL required permissions.
    </p>
    <p v-else>
      ✖ You do not meet ALL required permissions.
    </p>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 20px;
}
h2 {
  font-size: 22px;
  margin-bottom: 10px;
}
p {
  margin: 6px 0;
}
</style>
