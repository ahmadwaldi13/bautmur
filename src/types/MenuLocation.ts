export type MenuLocation = {
  id: number
  title: string
  path?: string
  newTab: boolean
  submenu?: MenuLocation[]
}
