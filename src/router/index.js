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
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/new',
      name: 'new-product',
      component: () => import('../views/NewProductView.vue')
    },
    {
      path: '/control',
      name: 'control-panel',
      meta:{
        requiresAuth: true
      },
      component: () => import('../views/ControlPanelView.vue')
    },
    {
      path: '/update/:id',
      name: 'update-product',
      component: () => import('../views/UpdateProductView.vue')
    }
  ]
})

//navigation guard
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    //check if there is something
    const user = localStorage.getItem('user');
    if(!user){
      next({name: 'login'})
    }else{
      next();
    }
  }else{
    //allow navigation
    next();
  }
})

export default router
