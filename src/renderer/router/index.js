import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: require('@/components/Layout').default
    },
    {
      path: '/menu',
      name: 'menu',
      component: require('@/components/Menu').default,
      children: [
        {
          path: 'systemaccount',
          component: require('@/components/SystemAccount').default
        },
        {
          path: 'layout',
          component: require('@/components/Layout').default
        },
        {
          path: 'ipfsdashboard',
          component: require('@/components/IpfsDashBoard').default
        }
      ]
    },
    {
      path: '/',
      name: 'menu',
      component: require('@/components/Menu').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
