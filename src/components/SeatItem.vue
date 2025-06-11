<template>
  <circle :cx="cx" :cy="cy" :r="r" :class="className" />
</template>
<script setup lang="ts">
defineProps<{ cx: string; cy: string; r: string; className: string }>()
</script>
