import { RouteNames } from '@/constants/route-names'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import NewsFeed from '@/views/news-feed.vue'
import PostView from '@/views/post-view.vue'
import PostEdit from '@/views/post-edit.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: Home
  },
  {
    path: '/news-feed',
    name: RouteNames.NEWS_FEED,
    component: NewsFeed
  },
  {
    path: '/posts/:id',
    name: RouteNames.POST_VIEW,
    props: true,
    component: PostView,
    children: [
      {
        path: 'edit',
        name: RouteNames.POST_EDIT,
        component: PostEdit
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
