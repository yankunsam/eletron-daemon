import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/accountname',
      name: 'account-name',
      component: require('@/components/AccountName').default
    },
    {
      path: '/menu',
      name: 'menu',
      component: require('@/components/Menu').default
    },
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
