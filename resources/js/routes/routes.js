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
    path: 'users/:id/edit',
    component: lazy(() => import('../pages/admin/Users/edit')),
    exact: true,
  },
  {
    path: 'users/:id',
    component: lazy(() => import('../pages/admin/Users/show')),
    exact: true,
  },
  {
    path: 'roles',
    component: lazy(() => import('../pages/admin/Roles')),
    exact: true,
  },
  {
    path: 'roles/create',
    component: lazy(() => import('../pages/admin/Roles/create')),
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
    path: 'lawsuites-papers',
    component: lazy(() => import('../pages/admin/Lawsuites/papers')),
    exact: true,
  },
  {
    path: 'lawsuit-cases',
    component: lazy(() => import('../pages/admin/Lawsuites/lawsuitCases')),
    exact: true,
  },
  {
    path: 'case-types',
    component: lazy(() => import('../pages/admin/Lawsuites/caseTypes')),
    exact: true,
  },
  {
    path: 'courts',
    component: lazy(() => import('../pages/admin/Lawsuites/courts')),
    exact: true,
  },
  {
    path: 'lawsuites',
    component: lazy(() => import('../pages/admin/Lawsuites')),
    exact: true,
  }
]