import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      redirect: '/communication',//设置默认指向的路径
      component: require('@/components/mainPage').default,
      children: [
        {
          path: 'NewPage',
          name: 'NewPage',
          component: require('@/components/NewPage').default,
        },
        {
          path: 'others',
          name: 'others',
          component: require('@/components/others').default,
        },
        {
          path: 'communication',
          name: 'communication',
          component: require('@/components/communication').default,
        }
      ]
    }
  ]
})
