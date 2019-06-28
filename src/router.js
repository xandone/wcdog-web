import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import jokeList from '@/pages/jokeList'
import jokeAdd from '@/pages/jokeAdd'
import personal from '@/pages/personal'
import jokeDetails from '@/pages/jokeDetails'
import userView from '@/pages/userView'
import searchResult from '@/pages/searchResult'

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
            path: '/searchResult/:key',
            name: 'searchResult',
            component: searchResult,
        },
    ]
})