import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import FriendsList from '@/components/FriendsList.vue'
import AuthCallback from '@/components/AuthCallback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/auth-callback',
      component: AuthCallback
    },
    {
      path: '/friends',
      component: FriendsList
    },
  ],
})

export default router
