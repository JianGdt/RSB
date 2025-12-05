<template>
  <div class="skeleton-wrapper">
    <div v-for="i in rows" :key="i" class="skeleton-row">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton-content">
        <div class="skeleton skeleton-text skeleton-name"></div>
        <div class="skeleton skeleton-text skeleton-email"></div>
      </div>
      <div class="skeleton skeleton-text skeleton-department"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rows?: number
}>()
</script>

<style scoped>
.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.skeleton {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-text {
  height: 16px;
}

.skeleton-name {
  width: 180px;
}

.skeleton-email {
  width: 240px;
}

.skeleton-department {
  width: 120px;
  height: 32px;
  border-radius: 16px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
