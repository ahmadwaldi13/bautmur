export type MenuLanguage = {
  id: number
  title: string
  path?: string
  newTab: boolean
  submenu?: MenuLanguage[]
}
