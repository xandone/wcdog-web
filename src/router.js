import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import jokeList from '@/pages/jokeList'
import jokeAdd from '@/pages/jokeAdd'
import personal from '@/pages/personal'
import jokeDetails from '@/pages/jokeDetails'
import userView from '@/pages/userView'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            children: [{
                path: '/',
                name: 'jokeList',
                component: jokeList,
            }, ]
        }, {
            path: '/jokeAdd',
            name: 'jokeAdd',
            component: jokeAdd,
        },
        {
            path: '/personal',
            name: 'personal',
            component: personal,
        },
        {
            path: '/jokeDetails/:jokeId',
            name: 'jokeDetails',
            component: jokeDetails,
        },
        {
            path: '/userView/:jokeUserId',
            name: 'userView',
            component: userView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})