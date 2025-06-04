import ArrowIcon from "./ArrowIcon.vue"



export const icons = {
  arrow: ArrowIcon,
} as const

export type IconName = keyof typeof icons
export type IconComponent = (typeof icons)[IconName]
export type IconProps = {
  name: IconName | (string & {})
  size?: string
  color?: string
  style?: string
}
