/* global Vue */
import Router from 'vue-router'
import MainTabPage from '@/widget/MainTabPage.vue'
import SearchPage from '@/components/bookstore/SearchPage.vue'
import BookStore from '@/components/bookstore/BookStorePage.vue'
import BookDetail from '@/components/bookstore/BookDetailPage.vue'
import ClassRoom from '@/components/classroom/ClassRoomPage.vue'
import DreamCircle from '@/components/dreamcircle/DreamCirclePage.vue'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'MainTabPage',
      component: MainTabPage
    },
    {
      path: '/searchpage',
      component: SearchPage
    },
    {
      path: '/bookstore',
      component: BookStore
    },
    {
      path: '/bookdetail',
      component: BookDetail
    },
    {
      path: '/classroom',
      component: ClassRoom
    },
    {
      path: '/dreamcircle',
      component: DreamCircle
    }
  ]
})
