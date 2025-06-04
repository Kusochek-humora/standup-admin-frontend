export interface SidebarItem {
  label: string
  to?: string // для верхнего уровня
  // permission?: string
  children?: {
    label: string
    to: string // обязательно
    permission?: string
  }[]
}
