import { createRouter, createWebHistory, type RouteRecordNameGeneric } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthenticationView from '@/views/AuthenticationView.vue'
import { useAuthStore } from '@/stores/AuthStore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    children: [
      {
        path: '',
        name: 'login',
        component: AuthenticationView
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AuthenticationView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

router.beforeEach(async (to) => {
  const publicPages: RouteRecordNameGeneric[] = ['login', 'home']
  const auth = useAuthStore()
  if (!publicPages.includes(to.name) && !auth.isLoggedIn) {
    return '/login'
  }
})
