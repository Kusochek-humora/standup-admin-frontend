<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'
// import { useAuthStore } from '@/stores/auth.store'
// const authStore = useAuthStore()
</script>
<template>
  <div class="panel-layout">
    <SidebarMenu
      :permissions="[
        'can_view_kitchen',
        'can_view_merch',
        'can_view_afisha',
        'can_view_blog',
        'can_view_about',
        'can_view_faq',
        'can_view_privacy',
        'can_view_contacts',
        'can_view_rules',
        'can_view_tours',
        'can_view_registrations',
      ]"
    />
    <main class="content" style="width: 100%;">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.panel-layout {
  display: flex;
  height: 100%;
  max-width: 100vw;
  width: 100%;
min-height: 100%;
  gap: 30px;
}
</style>
