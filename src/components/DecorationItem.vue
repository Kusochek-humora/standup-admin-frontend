<template>
  <component
    :is="tag"
    v-bind="attrs"
    v-if="tag === 'circle' || tag === 'path' || tag === 'polygon' || tag === 'rect'"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'circle' | 'path' | 'polygon' | 'rect'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs: Record<string, any>
  cx?: number
  cy?: number
  r?: number
  stroke?: string
  fill?: string
  d?: string
  points?: string
}>()

const tag = computed(() => props.type)
</script>
