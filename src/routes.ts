import { lazy } from 'solid-js';
// import { Router } from 'solid-app-router';
import type { RouteDefinition } from '@solidjs/router';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/home')),
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
  {
    path: '/login',
    component: lazy(() => import('./pages/login')),
  },
  {
    path: '/register',
    component: lazy(() => import('./pages/register')),
  },
  {
    path: '/forgotpassword',
    component: lazy(() => import('./pages/forgotpassword')),
  },
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/dashboard')),
  },
];
