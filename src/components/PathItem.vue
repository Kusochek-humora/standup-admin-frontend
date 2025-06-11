<template>
  <path :d="d" :class="className" />
</template>
<script setup lang="ts">
defineProps<{ d: string; className: string }>();
</script>
