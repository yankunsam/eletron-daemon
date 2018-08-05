import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/systemaccount',
      name: 'system-account',
      component: require('@/components/SystemAccount').default
    },
    {
      path: '/layout',
      name: 'layout',
      component: require('@/components/Layout').default
    },
    {
      path: '/menu',
      name: 'menu',
      component: require('@/components/Menu').default
    },
    {
      path: '/',
      name: 'layout',
      component: require('@/components/Layout').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
