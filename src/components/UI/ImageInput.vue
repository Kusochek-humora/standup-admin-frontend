<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  label?: string
}>()

const file = defineModel<File | null>('file') // ← важно!

const previewUrl = ref<string | null>(null)

watch(file, (newFile) => {
  if (newFile) {
    const reader = new FileReader()
    reader.onload = () => {
      previewUrl.value = reader.result as string
    }
    reader.readAsDataURL(newFile)
  } else {
    previewUrl.value = null
  }
})

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selected = target.files?.[0] ?? null
  file.value = selected instanceof File ? selected : null
  if (!selected || !(selected instanceof File)) {
  console.warn('⚠️ No file selected')
  return
}
}
</script>


<template>
  <label class="input-image">
    <legend class="legend-default input-image__label" v-if="props.label">{{ props.label }}</legend>
    <input type="file" accept="image/*" hidden @change="handleFileChange" />
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
