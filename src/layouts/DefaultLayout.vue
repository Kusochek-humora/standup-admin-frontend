<script lang="ts" setup></script>

<template>
  <main class="main-content">
    <slot />
  </main>

  <div class="footer"></div>
</template>
<style scoped lang="scss">

.main-content {
  background: $bg;
  flex-grow: 1;
}
</style>
