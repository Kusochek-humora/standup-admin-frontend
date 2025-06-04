<template>
  <div>
    <div class="price-controls">
      <div
        v-for="(option, index) in priceOptions"
        :key="index"
        class="price-option"
        :class="{ active: selectedPriceOption === option }"
        :style="selectedPriceOption === option ? { borderColor: option.color } : {}"
      >
        <label class="label-wrapper">
          <input
            type="radio"
            name="price"
            :value="option"
            v-model="selectedPriceOption"
            class="hidden-radio"
          />
          <span class="circle" :style="{ backgroundColor: option.color }"></span>
          <span class="label-text">Стоимость</span>
        </label>

        <div class="input-wrapper">
          <template v-if="!option.reserved">
            <input
              v-model.number="option.price"
              type="number"
              class="price-input"
              placeholder="0"
            />
            <span class="currency">₸</span>
          </template>

          <template v-else>
            <input type="text" class="price-input reserved-input" disabled placeholder="Резерв" />
          </template>
        </div>
      </div>
    </div>

    <canvas ref="canvas" width="720" height="435" class="seatmap-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
const hoveredSeatId = ref<string | null>(null)

interface SeatElement {
  id: string
  d: string
  fill: string
  overridePrice?: number
  isReserved?: boolean // ✅ добавляем сюда
}

interface DecorationElement {
  id: string | null
  d: string
  fill: string
}

interface PriceOption {
  color: string
  price?: number // цена теперь необязательна, т.к. у резерва её нет
  reserved?: boolean
}

const canvas = ref<HTMLCanvasElement | null>(null)
const priceOptions = ref<PriceOption[]>([
  { color: '#69c1e7', price: 1500 }, // rgba(105, 193, 231, 1)
  { color: '#00C445', price: 3000 }, // rgba(43, 190, 84, 1)
  { color: '#ffce00', price: 4500 }, // rgba(255, 206, 0, 1)
  { color: '#ff9d00', price: 6000 }, // rgba(255, 157, 0, 1)
  { color: '#ff0000', price: 7000 }, // rgba(255, 0, 0, 1)
  { color: '#ae00ff', price: 9500 }, // rgba(174, 0, 255, 1)
  { color: '#4a4a4a', reserved: true }, // 👈 резерв
])

const selectedPriceOption = ref<PriceOption>(priceOptions.value[0])
const seats = ref<SeatElement[]>([])
const decorations = ref<DecorationElement[]>([])

function getSeatPrice(seat: SeatElement): number {
  return seat.overridePrice ?? priceOptions.value.find((p) => p.color === seat.fill)?.price ?? 0
}

// function getPriceByColor(color: string): number {
//   const normalized = color.toLowerCase()
//   const option = priceOptions.value.find((p) => p.color.toLowerCase() === normalized)
//   return option?.price ?? 0
// }

let zoom = 1

let offsetX = 0

let offsetY = 0
let isDragging = false

let lastX = 0

let lastY = 0

function draw() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)
  ctx.save()
  ctx.translate(offsetX, offsetY)
  ctx.scale(zoom, zoom)

  // Decorations
  for (const deco of decorations.value) {
    const path = new Path2D(deco.d)
    ctx.fillStyle = 'transparent'
    ctx.strokeStyle = 'rgba(157, 160, 165, 1)'
    ctx.lineWidth = 0.75
    ctx.stroke(path)

    if (deco.id && /диван|divan|stol|table/i.test(deco.id)) {
      ctx.save()
      const match = deco.id.match(/(диван|стол|divan|table)[ _-]?(\d+)/i)
      const label = match ? `${match[1][0].toUpperCase() + match[1].slice(1)} ${match[2]}` : deco.id
      ctx.translate(0, 0)
      ctx.rotate(-Math.PI / 2)
      ctx.fillStyle = 'rgba(157, 160, 165, 1)'
      ctx.font = '14px sans-serif'
      ctx.fillText(label, -120, 10)
      ctx.restore()
    }
  }

  // Seats
  for (const seat of seats.value) {
    const path = new Path2D(seat.d)
    const isHovered = hoveredSeatId.value === seat.id

    ctx.fillStyle = seat.isReserved
      ? '#4a4a4a'
      : seat.fill && seat.fill !== 'none'
        ? seat.fill
        : '#cccccc'

    ctx.fill(path)
    ctx.strokeStyle = isHovered ? '#ffffff' : 'transparent'
    ctx.lineWidth = isHovered ? 2 : 1
    ctx.stroke(path)

    // Tooltip
    if (isHovered) {
      ctx.font = 'bold 12px sans-serif'
      ctx.fillStyle = '#ffffff'

      const tooltipText = seat.isReserved ? 'Резерв' : `${getSeatPrice(seat)} ₸`

      // Примерно получаем координаты из 'M x,y' SVG
      const match = seat.d.match(/M\s*([\d.]+)[ ,]([\d.]+)/)
      const x = match ? parseFloat(match[1]) : 10
      const y = match ? parseFloat(match[2]) : 10

      ctx.fillText(tooltipText, x + 10, y - 10)
    }
  }

  ctx.restore()
}
watch(
  priceOptions,
  (newOptions) => {
    for (const seat of seats.value) {
      const match = newOptions.find((p) => p.color.toLowerCase() === seat.fill.toLowerCase())

      if (match && !seat.isReserved) {
        // Только если overridePrice был установлен вручную (вручную кликнуто)
        seat.overridePrice = match.price
      }
    }

    draw()
  },
  { deep: true },
)
onMounted(async () => {
  try {
    const res = await fetch('/final_strictest_seatmap.json')
    const data = await res.json()
    console.log('Loaded data:', data)
    seats.value = data.seats.map((s: SeatElement): SeatElement => {
      const normalizedFill = (s.fill || '#cccccc').toLowerCase()

      const matchingOption = priceOptions.value.find(
        (p) => p.color.toLowerCase() === normalizedFill,
      )

      return {
        ...s,
        fill: normalizedFill,
        overridePrice: matchingOption?.reserved ? undefined : matchingOption?.price,
        isReserved: matchingOption?.reserved === true,
      }
    })

    decorations.value = data.decorations.map(
      (d: DecorationElement): DecorationElement => ({
        ...d,
        fill: d.fill || 'transparent',
      }),
    )

    draw()
  } catch (error) {
    console.error('Ошибка загрузки JSON', error)
  }

  const canvasEl = canvas.value!
  const ctx = canvasEl.getContext('2d')!

  canvasEl.addEventListener('click', (e) => {
    const rect = canvasEl.getBoundingClientRect()
    const x = (e.clientX - rect.left - offsetX) / zoom
    const y = (e.clientY - rect.top - offsetY) / zoom

    for (const seat of seats.value) {
      const path = new Path2D(seat.d)
      if (ctx.isPointInPath(path, x, y)) {
        const selected = selectedPriceOption.value

        seat.fill = selected.color
        seat.overridePrice = selected.reserved ? undefined : selected.price
        seat.isReserved = selected.reserved === true

        draw()
        break
      }
    }
  })

  canvasEl.addEventListener('wheel', (e) => {
    e.preventDefault()
    const scaleAmount = e.deltaY > 0 ? 0.9 : 1.1
    zoom *= scaleAmount
    draw()
  })

  canvasEl.addEventListener('mousedown', (e) => {
    isDragging = true
    lastX = e.clientX
    lastY = e.clientY
  })

  canvasEl.addEventListener('mouseup', () => {
    isDragging = false
  })

  canvasEl.addEventListener('mousemove', (e) => {
    const rect = canvasEl.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isDragging) {
      offsetX += e.clientX - lastX
      offsetY += e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      draw()
      return
    }

    // hover логика
    const transformedX = (x - offsetX) / zoom
    const transformedY = (y - offsetY) / zoom

    let found = false
    for (const seat of seats.value) {
      const path = new Path2D(seat.d)
      if (ctx.isPointInPath(path, transformedX, transformedY)) {
        hoveredSeatId.value = seat.id
        found = true
        break
      }
    }

    if (!found) hoveredSeatId.value = null
    draw()
  })
})
</script>

<style scoped lang="scss">
.price-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
  .price-option {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4px;
    padding: 8px 10px;
    border-radius: 12px;
    border: 1px solid transparent;
    transition: 0.2s;
    border-width: 2px;

    // &.active {
    //   border: 2px solid rgba(106, 107, 136, 1);
    // }
  }

  .label-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 15px;
    cursor: pointer;
    .hidden-radio {
      opacity: 0;
      position: absolute;
      pointer-events: none;
      width: 0;
      height: 0;
    }

    .circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .label-text {
      font-size: 18px;
      color: rgba(106, 107, 136, 1);
    }
  }

  .input-wrapper {
    position: relative;

    .price-input {
      width: 80px;
      padding: 6px 24px 6px 10px;
      border: 1px solid rgba(255, 255, 255, 1);
      border-radius: 12px;
      font-size: 14px;
      height: 50px;
      border-radius: 15px;
      width: 150px;
      color: $black;
    }

    .currency {
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
      font-weight: 600;
      font-size: 14px;
      color: black;
    }
  }
}

.seatmap-canvas {
  background-color: rgba(34, 36, 69, 1);
  display: block;
  border: 1px solid #333;
}
</style>
