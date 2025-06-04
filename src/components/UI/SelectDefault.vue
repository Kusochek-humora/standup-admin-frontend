<script setup lang="ts">
const props = defineProps<{
  label?: string
  placeholder: string
  options: { label: string; value: string | number }[]
}>()

const modelValue = defineModel<string | number | null>()
</script>

<template>
  <label class="select-default">
    <legend class="legend-default" v-if="props.label">{{ props.label }}</legend>
    <select v-model.number="modelValue">
      <option disabled value="">{{ props.placeholder }}</option>
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped lang="scss">
.select-default {
  display: flex;
  align-items: center;
  gap: 20px;

  select {
    max-width: 500px;
    width: 100%;
    border: 1px solid rgba(227, 227, 227, 1);
    background-color: $white;
    padding: 15px 20px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 600;
    color: $black;
    appearance: none;
    background-image: url(../../assets/images/select-arrow.svg);
    background-repeat: no-repeat;
    background-position: right 1.2rem center;
    background-size: 1rem;

    option[disabled] {
      color: rgba(170, 170, 170, 1);
    }
  }
}
</style>
