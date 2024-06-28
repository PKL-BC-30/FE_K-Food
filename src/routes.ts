import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';


const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const RegisterForm = lazy(() => import('./pages/register'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const LoginForm = lazy(() => import('./pages/login'));

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/register',
    component: RegisterForm
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    component: LoginForm
  }
];
