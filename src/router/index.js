import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history', // hash
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/epidemicQuery'),
      meta: { title: '新冠肺炎疫情实时查' }
    },
    {
      path: '/epidemicQuery',
      name: 'epidemicQuery',
      component: () => import('@/views/epidemicQuery'),
      meta: { title: '新冠肺炎疫情实时查' }
    },
    {
      path: '/epidemicQuery/detail',
      name: 'epidemicQueryDetail',
      component: () => import('@/views/epidemicQuery/detail'),
      meta: { title: '新冠肺炎疫情实时查' }
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: () => import('@/views/newsDetail'),
      meta: { title: '预览帖子' }
    }
  ],
  // 解决 vue 进入页面滚动条位置不在顶部问题
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
