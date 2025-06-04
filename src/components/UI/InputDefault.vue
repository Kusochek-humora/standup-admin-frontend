<script lang="ts" setup>
const props = defineProps<{
  label?: string
  type: string
  placeholder: string
  disabled?: boolean
}>()
const modelValue = defineModel<string | number | null>()
</script>

<template>
  <label class="input-default">
    <legend class="legend-default" v-if="props.label">{{ props.label }}</legend>
    <input
      v-model="modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
  </label>
</template>

<style scoped lang="scss">
.input-default {
  display: flex;
  align-items: center;
  gap: 20px;

  input {
    max-width: 500px;
    width: 100%;
    border: 1px solid rgba(227, 227, 227, 1);
    background-color: $white;
    padding: 15px 20px;
    border-radius: 15px;
    transition: 0.3s all;
    font-size: 14px;
    color: $black;
    font-weight: 600;
    &::placeholder {
      font-size: 15px;
      color: $grey;
      font-weight: 400;
    }
    &:disabled {
      background-color: rgba(246, 246, 246, 1);
      color: rgba(170, 170, 170, 1);
      border-color: rgba(227, 227, 227, 1);
      cursor: not-allowed;
      opacity: 0.8;
    }
  }
}
</style>
