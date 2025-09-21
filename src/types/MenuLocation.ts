export type MenuLocation = {
  id: number
  title?: string
  titleKey?: string
  path?: string
  newTab: boolean
  submenu?: MenuLocation[]
}
