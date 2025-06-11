<template>
  <svg>
    <!-- Группы -->
    <SvgGroup
      v-for="(grp, i) in plan.groups"
      :key="i"
      :id="grp.id"
      :className="grp.class"
      :children="grp.children"
    />

    <!-- Отдельные элементы вне групп -->
    <SeatItem
      v-for="(seat, i) in plan.standalone.seats"
      :key="`seat-${i}`"
      :cx="seat.cx"
      :cy="seat.cy"
      :r="seat.r"
      :className="seat.class"
    />
    <SeatItem
      v-for="(dec, i) in plan.standalone.decorations"
      :key="`dec-${i}`"
      :cx="dec.cx"
      :cy="dec.cy"
      :r="dec.r"
      :className="dec.class"
    />
    <LabelText
      v-for="(txt, i) in plan.standalone.texts"
      :key="`txt-${i}`"
      :transform="txt.transform"
      :className="txt.class"
      :tspans="txt.tspans"
    />
    <PathItem
      v-for="(p, i) in plan.standalone.paths"
      :key="`path-${i}`"
      :d="p.d"
      :className="p.class"
    />
    <PolygonItem
      v-for="(poly, i) in plan.standalone.polygons"
      :key="`poly-${i}`"
      :points="poly.points"
      :className="poly.class"
    />
  </svg>
</template>
<script setup lang="ts">
import SvgGroup from './SvgGroup.vue'
import SeatItem from './SeatItem.vue'
import PolygonItem from './PolygonItem.vue'
import PathItem from './PathItem.vue'
import LabelText from './LabelText.vue'

interface SeatOrDec {
  cx: string
  cy: string
  r: string
  class: string
}
interface TextObj {
  transform?: string
  class: string
  tspans: Array<{ x: string; y: string; text: string }>
}
interface PathObj {
  d: string
  class: string
}
interface PolygonObj {
  points: string
  class: string
}
interface PlanData {
  standalone: {
    seats: SeatOrDec[]
    decorations: SeatOrDec[]
    texts: TextObj[]
    paths: PathObj[]
    polygons: PolygonObj[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groups: Array<{ id?: string; class: string; children: any[] }>
}
defineProps<{ plan: PlanData }>()

</script>
