// import { Menu } from '@/types/Menu'
// import { MenuLocation } from '@/types/MenuLocation'

// export const menuData: Menu[] = [
//   {
//     id: 1,
//     title: 'Popular',
//     newTab: false,
//     path: '/',
//   },

//   {
//     id: 2,
//     title: 'Products',
//     newTab: false,
//     path: '/products',
//   },
//   {
//     id: 3,
//     title: 'Contact Us',
//     newTab: false,
//     path: '/contact',
//   },

//   {
//     id: 4,
//     title: 'Gallery',
//     newTab: false,
//     path: '/gallery',
//   },
//   {
//     id: 5,
//     title: 'Purchasing',
//     newTab: false,
//     path: '/purchasing',
//   },
//   {
//     id: 6,
//     title: 'Career',
//     newTab: false,
//     path: '/career',
//   },

// ]

// export const menuLocation: MenuLocation[] = [
//   {
//     id: 1,
//     title: 'Location',
//     newTab: false,
//     path: '',
//     submenu: [
//       {
//         id: 1,
//         title: 'Karapitan',
//         newTab: false,
//         path: '/bautmur/bandung',
//       },
//       {
//         id: 2,
//         title: 'Toha',
//         newTab: false,
//         path: '/bautmur/jakarta',
//       },
//     ],
//   },
// ]

import { Menu } from '@/types/Menu'

export const menuData: Menu[] = [
  {
    id: 1,
    titleKey: 'menu.popular', // <--- Ubah ini
    newTab: false,
    path: '/',
  },
  {
    id: 2,
    titleKey: 'menu.products', // <--- Ubah ini
    newTab: false,
    path: '/products',
  },
  {
    id: 3,
    titleKey: 'menu.contact_us', // <--- Ubah ini
    newTab: false,
    path: '/contact',
  },
  {
    id: 4,
    titleKey: 'menu.gallery', // <--- Ubah ini
    newTab: false,
    path: '/gallery',
  },
  {
    id: 5,
    titleKey: 'menu.purchasing', // <--- Ubah ini
    newTab: false,
    path: '/purchasing',
  },
  {
    id: 6,
    titleKey: 'menu.career', // <--- Ubah ini
    newTab: false,
    path: '/career',
  },
]
