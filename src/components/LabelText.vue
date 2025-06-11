<template>
  <text :transform="transform" :class="className">
    <tspan v-for="(t, i) in tspans" :key="i" :x="t.x" :y="t.y">
      {{ t.text }}
    </tspan>
  </text>
</template>
<script setup lang="ts">
interface Tspan {
  x: string
  y: string
  text: string
}
defineProps<{ transform?: string; className: string; tspans: Tspan[] }>()
</script>
