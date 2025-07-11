import { Menu } from '@/types/Menu'
import { MenuLocation } from '@/types/MenuLocation'
import { MenuLanguage } from '@/types/MenuLanguage'

export const menuData: Menu[] = [
  {
    id: 1,
    title: 'Popular',
    newTab: false,
    path: '/',
  },
  {
    id: 2,
    title: 'Products',
    newTab: false,
    path: '/shop-with-sidebar',
  },
  {
    id: 3,
    title: 'Contact Us',
    newTab: false,
    path: '/contact',
  },
  {
    id: 4,
    title: 'Gallery',
    newTab: false,
    path: '/gallerys',
  },
  {
    id: 5,
    title: 'Purchasing',
    newTab: false,
    path: '/purchasing',
  },
  {
    id: 6,
    title: 'pages',
    newTab: false,
    path: '/',
    submenu: [
      {
        id: 61,
        title: 'Shop With Sidebar',
        newTab: false,
        path: '/shop-with-sidebar',
      },
      {
        id: 62,
        title: 'Shop Without Sidebar',
        newTab: false,
        path: '/shop-without-sidebar',
      },
      {
        id: 64,
        title: 'Checkout',
        newTab: false,
        path: '/checkout',
      },
      {
        id: 65,
        title: 'Cart',
        newTab: false,
        path: '/cart',
      },
      {
        id: 66,
        title: 'Wishlist',
        newTab: false,
        path: '/wishlist',
      },
      {
        id: 67,
        title: 'Sign in',
        newTab: false,
        path: '/signin',
      },
      {
        id: 68,
        title: 'Sign up',
        newTab: false,
        path: '/signup',
      },
      {
        id: 69,
        title: 'My Account',
        newTab: false,
        path: '/my-account',
      },
      {
        id: 70,
        title: 'Contact',
        newTab: false,
        path: '/contact',
      },
      {
        id: 62,
        title: 'Error',
        newTab: false,
        path: '/error',
      },
      {
        id: 63,
        title: 'Mail Success',
        newTab: false,
        path: '/mail-success',
      },
    ],
  },
  {
    id: 7,
    title: 'blogs',
    newTab: false,
    path: '/',
    submenu: [
      {
        id: 71,
        title: 'Blog Grid with sidebar',
        newTab: false,
        path: '/blogs/blog-grid-with-sidebar',
      },
      {
        id: 72,
        title: 'Blog Grid',
        newTab: false,
        path: '/blogs/blog-grid',
      },
      {
        id: 73,
        title: 'Blog details with sidebar',
        newTab: false,
        path: '/blogs/blog-details-with-sidebar',
      },
      {
        id: 74,
        title: 'Blog details',
        newTab: false,
        path: '/blogs/blog-details',
      },
    ],
  },
]

export const menuLocation: MenuLocation[] = [
  {
    id: 1,
    title: 'Location',
    newTab: false,
    path: '',
    submenu: [
      {
        id: 1,
        title: 'Bandung',
        newTab: false,
        path: '/bautmur/bandung',
      },
      {
        id: 2,
        title: 'Jakarta',
        newTab: false,
        path: '/bautmur/jakarta',
      },
    ],
  },
]

export const menuLanguage: MenuLanguage[] = [
  {
    id: 1,
    title: 'Language',
    newTab: false,
    path: '/bautmur/language',
    submenu: [
      {
        id: 1,
        title: 'English',
        path: '/bautmur/english',
        newTab: false,
      },
      {
        id: 2,
        title: 'Indonesia',
        path: '/bautmur/language/indonesia',
        newTab: false,
      },
      {
        id: 2,
        title: '中文',
        path: '/bautmur/language/中文',
        newTab: false,
      },
    ],
  },
]
