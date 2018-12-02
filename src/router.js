import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Artist from './views/Artist.vue'
import Album from './views/Album.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/artist/:id',
      name: 'Artist',
      component: Artist
    },
    {
      path:'/artist/:id/album/:albumId',
      name: 'Album',
      component: Album
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
