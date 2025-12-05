import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/employees',
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/views/EmployeeListView.vue'),
    meta: {
      title: 'Employees - CentHRIS',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'CentHRIS'
  next()
})

export default router
