<script setup lang="ts">
import CheckboxDefault from '@/components/UI/CheckboxDefault.vue'
import InputDefault from '@/components/UI/InputDefault.vue'
import SelectDefault from '@/components/UI/SelectDefault.vue'
import type { EventCreatePayload, EventResource } from '@/types/event-create'
import { EventService } from '@/services/event.service'
import { onMounted, ref, reactive } from 'vue'
import ImageInput from '@/components/UI/ImageInput.vue'
import SeatMap from '@/components/SeatMap.vue'
const anotherEvent = ref(false)
const isLoading = ref(false)
const posterImage = ref<File | null>(null)

const selectedPrice = ref<{ value: number; color: 'green' | 'blue' | 'red' | 'yellow' } | null>(
  null,
)
const isReserveMode = ref(false)

const priceInputs = reactive({
  green: 0,
  blue: 0,
  red: 0,
  yellow: 0,
})

const form = ref<EventCreatePayload>({
  title_ru: '',
  title_kz: '',
  hall_id: 0,
  event_date: '',
  event_hour: 0,
  event_minute: 0,
  is_active: true,
  is_main_event: false,
  has_seat_selection: false,
  is_donation_event: false,
  price_from: undefined,
  ticket_link: '',
  seat_prices: [],
})

const events = ref<EventResource[]>([])

function selectPrice(color: 'green' | 'blue' | 'red' | 'yellow') {
  selectedPrice.value = {
    color,
    value: priceInputs[color],
  }
  isReserveMode.value = false
}

const onSubmit = async () => {
  try {
    const res = await EventService.createEvent(form.value)
    console.log('Успех', res)
  } catch (e) {
    console.error('Ошибка создания', e)
  }
}

onMounted(async () => {
  try {
    const data = await EventService.getAllEvents()
    events.value = data
    console.log('Список мероприятий:', data)
  } catch (e) {
    console.error('Ошибка при загрузке событий', e)
  }
})
</script>

<template>
  <section class="events">
    <h2>Добавить мероприятие</h2>
    <div class="events__container content__container">
      <InputDefault
        v-model="form.title_ru"
        type="text"
        placeholder="введите текст"
        label="Заголовок RU"
      />
      <InputDefault
        v-model="form.title_kz"
        type="text"
        placeholder="введите текст"
        label="Заголовок KZ"
      />
      <InputDefault
        v-model="form.price_from"
        type="number"
        placeholder="введите стоимость"
        label="Стоимость от"
      />

      <SelectDefault
        v-model="form.hall_id"
        label="Место проведения"
        placeholder="Выберите зал"
        :options="[
          { label: 'Малый зал', value: 1 },
          { label: 'Большой зал ', value: 2 },
          { label: 'Другое место', value: 3 },
        ]"
      />

      <CheckboxDefault v-model="form.has_seat_selection" label="С выбором места" />
      <CheckboxDefault v-model="form.is_donation_event" label="Донатное мероприятие" />
      <CheckboxDefault v-model="form.is_main_event" label="Главное мероприятие" />
      <CheckboxDefault v-model="form.is_active" label="Активное мероприятие" />

      <CheckboxDefault label="Через Shodim.com" v-model="anotherEvent" />
      <InputDefault
        v-model="form.ticket_link"
        label="Ссылка на покупку билета"
        type="text"
        placeholder="https://shodim.site/..."
        :disabled="!anotherEvent"
      />

      <InputDefault
        v-model="form.event_date"
        label="Дата мероприятия"
        type="date"
        placeholder="Выберите дату"
      />

      <ImageInput v-model="posterImage" label="Постер мероприятия" />

      <div class="price-inputs">
        <input
          style="color: black"
          type="number"
          v-model.number="priceInputs.green"
          @focus="selectPrice('green')"
          placeholder="Стоимость зелёный"
        />
        <input
          style="color: black"
          type="number"
          v-model.number="priceInputs.blue"
          @focus="selectPrice('blue')"
          placeholder="Стоимость синий"
        />
        <input
          style="color: black"
          type="number"
          v-model.number="priceInputs.red"
          @focus="selectPrice('red')"
          placeholder="Стоимость красный"
        />
        <input
          style="color: black"
          type="number"
          v-model.number="priceInputs.yellow"
          @focus="selectPrice('yellow')"
          placeholder="Стоимость жёлтый"
        />
      </div>
      <SeatMap />
      <button
        class="button-default events__btn"
        @click="onSubmit"
        :disabled="isLoading"
        style="color: black"
      >
        {{ isLoading ? 'Отправка...' : 'Создать событие' }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
:deep(.seat--green) {
  fill: #4caf50 !important;
}
:deep(.seat--blue) {
  fill: #2196f3 !important;
}
:deep(.seat--red) {
  fill: #f44336 !important;
}
:deep(.seat--yellow) {
  fill: #ffc107 !important;
}
:deep(.seat--reserved) {
  stroke: white;
  stroke-width: 3px;
}

.events {
  width: 100%;
  padding-top: 30px;
  h2 {
    color: $black;
  }
  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  &__btn {
  }
}
</style>
