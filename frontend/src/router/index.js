import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import SignupView from '../views/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/channels',
      name: 'channels',
      component: () => import('../views/UserChannelView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/:id',
      name: 'userDetails',

      component: () => import('../views/UserDetailView.vue')
    },
    {
      path: '/videos',
      name: 'videos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VideosView.vue')
    },
    {
      path: '/video-uploader',
      name: 'videoUploader',

      component: () => import('../components/VideoUploaderView.vue')
    }
  ]
})

export default router
