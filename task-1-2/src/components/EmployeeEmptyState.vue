<template>
  <div class="empty-container">
    <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    message?: string
  }>(),
  {
    title: 'No employees found',
    message: 'Try adjusting your search or filter criteria.',
  },
)
</script>

<style scoped>
.empty-container {
  text-align: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.empty-icon {
  display: block;
  margin: 0 auto;
  width: 3rem;
  height: 3rem;
  color: #9ca3af;
}

.empty-title {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.empty-message {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
