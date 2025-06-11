<template>
  <polygon :points="points" :class="className" />
</template>
<script setup lang="ts">
 defineProps<{ points: string; className: string }>();
</script>
