<template>
  <g :id="id" :class="className">
    <template v-for="(child, idx) in children" :key="idx">
      <SeatItem
        v-if="child.tag === 'circle'"
        :cx="child.cx!"
        :cy="child.cy!"
        :r="child.r!"
        :className="child.class!"
      />
      <LabelText
        v-else-if="child.tag === 'text'"
        :transform="child.transform"
        :className="child.class!"
        :tspans="child.tspans!"
      />
      <PathItem v-else-if="child.tag === 'path'" :d="child.d!" :className="child.class!" />
      <PolygonItem
        v-else-if="child.tag === 'polygon'"
        :points="child.points!"
        :className="child.class!"
      />
    </template>
  </g>
</template>
<script setup lang="ts">
import SeatItem from './SeatItem.vue'
import PolygonItem from './PolygonItem.vue'
import PathItem from './PathItem.vue'
import LabelText from './LabelText.vue'

interface Child {
  tag: string
  cx?: string
  cy?: string
  r?: string
  transform?: string
  d?: string
  points?: string
  class?: string
  tspans?: Array<{ x: string; y: string; text: string }>
}
defineProps<{ id?: string; className: string; children: Child[] }>()
</script>
