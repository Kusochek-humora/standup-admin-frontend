// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

// layout
import PanelLayout from '@/layouts/PanelLayout.vue';

// pages
import LoginPage from '@/pages/LoginPage.vue';
import AdminPanel from '@/pages/AdminPanel.vue';

import KitchenPage from '@/pages/KitchenPage.vue';
import KitchenStatsPage from '@/pages/KitchenStatsPage.vue';
import KitchenOrdersPage from '@/pages/KitchenOrdersPage.vue';

import MerchPage from '@/pages/MerchPage.vue';
import MerchStatsPage from '@/pages/MerchStatsPage.vue';
import MerchCategoryPage from '@/pages/MerchCategoryPage.vue';

import BlogPage from '@/pages/BlogPage.vue';
import BlogCategoriesPage from '@/pages/BlogCategoriesPage.vue';

import EventsPage from '@/pages/events/EventsPage.vue';
import EventCreatePage from '@/pages/events/EventCreatePage.vue';
import EventStatsPage from '@/pages/events/EventStatsPage.vue';
import EventNotifyPage from '@/pages/events/EventNotifyPage.vue';

import ToursPage from '@/pages/ToursPage.vue';
import ToursCreatePage from '@/pages/ToursCreatePage.vue';

import AboutPage from '@/pages/AboutPage.vue';
import ContactsPage from '@/pages/ContactsPage.vue';
import PrivacyPage from '@/pages/PrivacyPage.vue';
import RulesPage from '@/pages/RulesPage.vue';
import OfferPage from '@/pages/OfferPage.vue';
import FaqPage from '@/pages/FaqPage.vue';
import RolesPage from '@/pages/RolesPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/admin-panel',
      component: PanelLayout,
      children: [
        { path: '', name: 'admin-panel', component: AdminPanel },

        // Афиша
        { path: 'events', name: 'admin-events', component: EventsPage },
        { path: 'events/create', name: 'admin-events-create', component: EventCreatePage },
        { path: 'events/stats', name: 'admin-events-stats', component: EventStatsPage },
        { path: 'events/notify', name: 'admin-events-notify', component: EventNotifyPage },

        // Кухня
        { path: 'kitchen', name: 'admin-kitchen', component: KitchenPage },
        { path: 'kitchen/stats', name: 'admin-kitchen-stats', component: KitchenStatsPage },
        { path: 'kitchen/orders', name: 'admin-kitchen-orders', component: KitchenOrdersPage },

        // Мерч
        { path: 'merch', name: 'admin-merch', component: MerchPage },
        { path: 'merch/stats', name: 'admin-merch-stats', component: MerchStatsPage },
        { path: 'merch/category', name: 'admin-merch-category', component: MerchCategoryPage },

        // Блог
        { path: 'blog', name: 'admin-blog', component: BlogPage },
        { path: 'blog/categories', name: 'admin-blog-categories', component: BlogCategoriesPage },

        // Туры
        { path: 'tours', name: 'admin-tours', component: ToursPage },
        { path: 'tours/create', name: 'admin-tours-create', component: ToursCreatePage },

        // Без подменю
        { path: 'about', name: 'admin-about', component: AboutPage },
        { path: 'contacts', name: 'admin-contacts', component: ContactsPage },
        { path: 'privacy', name: 'admin-privacy', component: PrivacyPage },
        { path: 'rules', name: 'admin-rules', component: RulesPage },
        { path: 'offer', name: 'admin-offer', component: OfferPage },
        { path: 'faq', name: 'admin-faq', component: FaqPage },
        { path: 'roles', name: 'admin-roles', component: RolesPage },
      ],
    },
  ],
});

export default router;
