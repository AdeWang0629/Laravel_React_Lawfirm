import { lazy } from 'react';


export default [
  {
    path: 'home',
    component: lazy(() => import('../pages/admin/Home')),
    exact: true,
  },
  {
    path: 'calendar',
    component: lazy(() => import('../pages/admin/Calendar')),
    exact: true,
  },
  {
    path: 'users',
    component: lazy(() => import('../pages/admin/Users')),
    exact: true,
  },
  {
    path: 'users/create',
    component: lazy(() => import('../pages/admin/Users/create')),
    exact: true,
  },
  {
    path: 'roles',
    component: lazy(() => import('../pages/admin/Roles')),
    exact: true,
  },
  {
    path: 'clients-types',
    component: lazy(() => import('../pages/admin/Clients/types')),
    exact: true,
  },
  {
    path: 'clients',
    component: lazy(() => import('../pages/admin/Clients/types')),
    exact: true,
  },
  {
    path: 'lawsuites/create',
    component: lazy(() => import('../pages/admin/Lawsuites/create')),
    exact: true,
  },
  {
    path: 'lawsuites',
    component: lazy(() => import('../pages/admin/Lawsuites')),
    exact: true,
  }
]