import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


// routes list
const routes = [
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',

    component: () => import('../views/RegView.vue')
  },
  {
    path: '/users',
    name: 'users',

    props: true,
    component: () => import('../views/UsersView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
