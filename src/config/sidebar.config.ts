import type { SidebarItem } from '@/types/permission'

export const menuItems: SidebarItem[] = [
  {
    label: 'Мероприятия',

    children: [
      { label: 'Главная', to: '/admin-panel/events' },
      { label: 'Создать', to: '/admin-panel/events/create' },
      { label: 'Статистика', to: '/admin-panel/events/stats' },
      { label: 'Оповещение', to: '/admin-panel/events/notify' },
    ],
  },
  {
    label: 'Кухня',

    children: [
      { label: 'Главная', to: '/admin-panel/kitchen' },
      { label: 'Статистика', to: '/admin-panel/kitchen/stats' },
      { label: 'Заказы онлайн', to: '/admin-panel/kitchen/orders' },
    ],
  },
  {
    label: 'Мерч',

    children: [
      { label: 'Главная', to: '/admin-panel/merch' },
      { label: 'Категории', to: '/admin-panel/merch/category' },
      { label: 'Статистика', to: '/admin-panel/merch/stats' },
    ],
  },
  {
    label: 'Туры',

    children: [
      { label: 'Главная', to: '/admin-panel/tours' },
      { label: 'Создать тур', to: '/admin-panel/tours/create' },
    ],
  },
  {
    label: 'Блог',

    children: [
      { label: 'Главная', to: '/admin-panel/blog' },
      { label: 'Категории', to: '/admin-panel/blog/categories' },
    ],
  },
  {
    label: 'О проекте',
    to: '/admin-panel/about',

  },
  {
    label: 'FAQ',
    to: '/admin-panel/faq',

  },
  {
    label: 'Политика конфиденциальности',
    to: '/admin-panel/privacy',

  },
  {
    label: 'Оферта',
    to: '/admin-panel/offer',
    // permission: 'can_view_offer',
  },
  {
    label: 'Контакты',
    to: '/admin-panel/contacts',

  },
  {
    label: 'Правила клуба',
    to: '/admin-panel/rules',

  },
  {
    label: 'Роли',
    to: '/admin-panel/roles',

  },
]
