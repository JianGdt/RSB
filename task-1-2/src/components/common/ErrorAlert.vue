<template>
  <div class="alert-container">
    <div class="alert-content">
      <div class="alert-icon">
        <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="alert-text">
        <h3 class="alert-title">{{ title }}</h3>
        <p class="alert-message">{{ message }}</p>
      </div>
      <button v-if="dismissible" @click="$emit('dismiss')" class="alert-dismiss">
        <span class="sr-only">Dismiss</span>
        <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  message: string
  dismissible?: boolean
}>()

defineEmits<{
  dismiss: []
}>()
</script>

<style scoped>
.alert-container {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
}

.alert-content {
  display: flex;
  align-items: flex-start;
}

.alert-icon {
  flex-shrink: 0;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #f87171;
}

.alert-text {
  margin-left: 0.75rem;
  flex: 1;
}

.alert-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #991b1b;
  margin: 0;
}

.alert-message {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #b91c1c;
}

.alert-dismiss {
  margin-left: 0.75rem;
  flex-shrink: 0;
  color: #f87171;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.alert-dismiss:hover {
  color: #b91c1c;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
