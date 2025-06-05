import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import {loadLayoutMiddleware} from "@/app/providers/router/middleware/loadLayout.middleware.ts";



export const router = createRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export {loadLayoutMiddleware}