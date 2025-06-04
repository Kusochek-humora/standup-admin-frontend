<script setup lang="ts">
import { computed } from 'vue'
import { icons } from '../icons'
import type { IconProps } from '../icons'

const props = defineProps<IconProps>()

const CurrentIcon = computed(() => {
  return icons[props.name as keyof typeof icons] || null
})

// const svgColor = computed(() => props.color || 'inherit')
</script>

<template>
  <component :is="CurrentIcon"  :style="props.style" v-if="CurrentIcon" />
</template>
<style></style>
