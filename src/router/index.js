import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new',
      name: 'new-product',
      component: () => import('../views/NewProductView.vue')
    },
    {
      path: '/control',
      name: 'control-panel',
      component: () => import('../views/ControlPanelView.vue')
    },
    {
      path: '/update/:id',
      name: 'update-product',
      component: () => import('../views/UpdateProductView.vue')
    }
  ]
})

export default router
