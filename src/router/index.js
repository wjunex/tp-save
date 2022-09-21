import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue')
    },
    {
      path: '/single',
      name: 'single',
      component: () => import('../views/single.vue')
    },
    {
      path: '/batch',
      name: 'batch',
      component: () => import('../views/batch.vue')
    }
  ]
})

export default router
