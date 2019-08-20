import { lazy } from 'react';

const publicRoutes = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../../pages/Login')),
    topLevelRoute: true,
  },
  {
    path: '/404',
    exact: true,
    component: lazy(() => import('./PageNotFound')),
    topLevelRoute: true,
  }
];

const privateRoutes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import('../../pages/Dashboard')),
    topLevelRoute: true,
  },
  {
    path: "/games",
    exact: true,
    component: lazy(() => import('../../pages/Games')),
    topLevelRoute: true,
  },
  {
    path: '/account',
    exact: true,
    component: lazy(() => import('../../pages/Account')),
    topLevelRoute: true,
  },
  {
    path: '/account/edit',
    exact: true,
    component: lazy(() => import('../../pages/Account/Edit')),
    topLevelRoute: false,
  },
];

const allRoutes = [
  ...publicRoutes,
  ...privateRoutes,
].reduce((routes, r) => ({
  ...routes,
  [`${r.path}`]: { ...r }
}), {});

export {
  allRoutes,
  publicRoutes,
  privateRoutes,
};
