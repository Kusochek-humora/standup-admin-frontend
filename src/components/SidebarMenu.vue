<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
// import type { SidebarItem } from '@/types/permission'
import { menuItems } from '@/config/sidebar.config'
import IconComponent from './UI/IconComponent.vue'

const opened = ref<string | null>(null)
const route = useRoute()

const toggle = (key: string) => {
  opened.value = opened.value === key ? null : key
}

const visibleMenuItems = computed(() => menuItems)

onMounted(() => {
  for (const item of visibleMenuItems.value) {
    if (item.children?.some((child) => child.to === route.path)) {
      opened.value = item.label
      break
    }
  }
})

const onBeforeEnter = (el: Element) => {
  const target = el as HTMLElement
  target.style.maxHeight = '0'
  target.style.overflow = 'hidden'
}

const onEnter = (el: Element) => {
  const target = el as HTMLElement
  target.style.transition = 'max-height 0.3s ease'
  target.style.maxHeight = target.scrollHeight + 'px'
}

const onAfterEnter = (el: Element) => {
  const target = el as HTMLElement
  target.style.maxHeight = 'none'
  target.style.overflow = 'visible'
}

const onBeforeLeave = (el: Element) => {
  const target = el as HTMLElement
  target.style.maxHeight = target.scrollHeight + 'px'
  target.style.overflow = 'hidden'
}

const onLeave = (el: Element) => {
  const target = el as HTMLElement
  target.style.transition = 'max-height 0.3s ease'
  target.style.maxHeight = '0'
}

const onAfterLeave = (el: Element) => {
  const target = el as HTMLElement
  target.style.maxHeight = ''
}
</script>

<template>
  <aside class="sidebar">
    <p>Административная панель</p>

    <ul class="sidebar__list">
      <li class="sidebar__list-item" v-for="item in visibleMenuItems" :key="item.label">
        <!-- С подменю -->
        <template v-if="item.children">
          <button
            class="sidebar__list-link"
            style="padding: 15px 20px"
            type="button"
            @click="toggle(item.label)"
            :class="{ active: route.path === item.to }"
          >
            {{ item.label }}
            <span>
              <IconComponent
                class="icon"
                name="arrow"
                :class="{ rotated: opened === item.label }"
              />
            </span>
          </button>

          <transition
            @enter="onEnter"
            @before-enter="onBeforeEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
            @before-leave="onBeforeLeave"
            @after-leave="onAfterLeave"
          >
            <ul v-if="opened === item.label" class="sidebar__sublist" ref="subMenuRef">
              <li class="sidebar__list-item" v-for="child in item.children" :key="child.label">
                <RouterLink
                  style="padding: 15px 20px"
                  class="sidebar__list-link"
                  v-if="child.to"
                  :to="child.to"
                  :class="{ active: route.path === child.to }"
                >
                  {{ child.label }}
                </RouterLink>
              </li>
            </ul>
          </transition>
        </template>

        <!-- Без подменю -->
        <template v-else>
          <RouterLink
            style="padding: 15px 20px"
            class="sidebar__list-link"
            v-if="item.to"
            :to="item.to"
            :class="{ active: route.path === item.to }"
          >
            {{ item.label }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  background: rgba(16, 17, 33, 1);
  min-height: 100%;
  border-right: 1px solid rgba(59, 59, 59, 1);
  padding: 30px;
  // стили сюда
  &__list {
    display: flex;
    flex-direction: column;
    &-item {
    }
    &-link {
      font-size: 16px;
      color: rgba(174, 174, 174, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border-radius: 10px;
      transition: 0.3s all;
      &:hover {
        background-color: rgba(53, 55, 87, 1);
      }
      &.active {
        background-color: $yellow;
        color: $black;
      }
    }
  }
}

.icon {
  transform: rotate(-90deg);
  transition: transform 0.3s ease;
  &.rotated {
    transform: rotate(0);
  }
}
</style>
