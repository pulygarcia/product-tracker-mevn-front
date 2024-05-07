import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authServices from '@/api/authServices'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthLayout.vue'),
      children: [
        {
          path : 'register',
          name : 'register',
          component : () => import('../views/RegisterView.vue')
        },
        {
          path : 'verify/:token',
          name : 'verify-account',
          component : () => import('../views/VerifyAccountView.vue')
        },
        {
          path : 'login',
          name : 'login',
          component : () => import('../views/LoginView.vue')
        },
      ]
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
router.beforeEach(async (to, from, next) => {
  //send the token in headers of the request so that can validate the json web token
  if(to.meta.requiresAuth){
    try {
      await authServices.auth();
      //authenticated correctly
      next();

    } catch (error) {
      //error veirfying the token, redirect
      next({name: 'login'})
    }

  }else{
    //allow navigation
    next();
  }
})

export default router
