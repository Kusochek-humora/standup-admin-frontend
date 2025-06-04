<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  label?: string
}>()

const modelValue = defineModel<File | null>()

const previewUrl = ref<string | null>(null)

watch(modelValue, (file) => {
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      previewUrl.value = reader.result as string
    }
    reader.readAsDataURL(file)
  } else {
    previewUrl.value = null
  }
})
</script>

<template>
  <label class="input-image">
    <legend class="legend-default input-image__label" v-if="props.label">{{ props.label }}</legend>
    <input
      type="file"
      accept="image/*"
      hidden
      @change="(e: Event) => (modelValue = (e.target as HTMLInputElement).files?.[0] || null)"
    />
    <img v-if="previewUrl" :src="previewUrl" alt="Превью" class="preview" />
  </label>
</template>

<style scoped lang="scss">
.input-image {
  display: flex;
  height: 300px;
  max-width: 300px;
  width: 100%;
  background-color: #fff;
  gap: 10px;
  position: relative;

  cursor: pointer;
  &__label {
    text-align: center;
    color: $black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5px;

  }
}

.preview {
  position: absolute;
width: 100%;
height: 100%;

  object-fit: cover;
  border-radius: 8px;
}
</style>
