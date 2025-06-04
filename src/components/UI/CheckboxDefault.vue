<script lang="ts" setup>
const props = defineProps<{
  label: string
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
  <label class="checkbox-default">
    <legend class="legend-default">{{ props.label }}</legend>
    <input type="checkbox" v-model="modelValue" />
  </label>
</template>

<style scoped lang="scss">
.checkbox-default {
  display: flex;
  gap: 20px;

  input {
    accent-color: rgba(34, 36, 69, 1);
    width: 18px;
    height: 18px;
    border: rgba(131, 133, 168, 1);
  }
}
</style>
