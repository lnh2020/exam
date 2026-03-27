import { createWebHistory, createRouter } from 'vue-router'

import Layout from '@/layout/index.vue'

const routes = [
    {
        path: '/',
        component: () => import("@/view/index.vue")
    },
    {
        path: '/question',
        component: Layout,
        children: [
            {
                path: ':code',
                name: 'Question',
                component: () => import("@/view/question/index.vue")
            }
        ]
    },

]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})