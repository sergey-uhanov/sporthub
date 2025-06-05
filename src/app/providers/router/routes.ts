import {AppLayoutsEnum} from "@/widgets/layouts/model/layouts.types.ts";
import NotFound from "@/pages/not-found";

export const routes =  [
    {
        path: '/auth',
        children: [
            {
                path: 'login',
                children: [
                    {
                        path: 'creator',
                        name: 'login-creator',
                        meta:{title: 'Login Creator', forgotPage:'forgot-password-creator'},
                        component: () => import('@/pages/creator/login-creator'),
                    },
                    {
                        path: 'user',
                        name: 'login-user',
                        meta:{title: 'Login User', forgotPage:'forgot-password-user'},
                        component: () => import('@/pages/user/login-user'),
                    },
                ],
            },
            {
                path: 'registration',
                children: [
                    {
                        path: 'creator',
                        name: 'registration-creator',
                        component: () => import('@/pages/creator/registration-creator'),
                    },
                    {
                        path: 'user',
                        name: 'registration-user',
                        component: () => import('@/pages/user/registration-user'),
                    },
                ],
            },
            {
                path: 'forgot-password',
                children: [
                    {
                        path: 'creator',
                        name: 'forgot-password-creator',
                        component: () => import('@/pages/creator/forgot-password-creator')
                    },
                    {
                        path: 'user',
                        name: 'forgot-password-user',
                        component: () => import('@/pages/user/forgot-password-user'),
                    }
                ]

            },
            {
                path: 'restore-password',
                children: [
                    {
                        path: 'creator',
                        name: 'restore-password-creator',
                        component: () => import('@/pages/creator/restore-password-creator')
                    },
                    {
                        path: 'user',
                        name: 'restore-password-user',
                        component: () => import('@/pages/user/restore-password-user')
                    }
                ]
            }
        ],
    },
    {
        path: '/creator',
        meta: {requiresAuth: true, roles: ['creator']},
        children: [
            {
                path: 'home',
                name: 'creator-home',
                component: () => import('@/pages/creator/home-creator'),
                meta: {
                    layout: AppLayoutsEnum.creator,
                },
            },
            {
                path: 'new-video',
                name: 'add-new-video',
                component: () => import('@/pages/creator/add-video'),
                meta: {
                    layout: AppLayoutsEnum.creator,
                },
            },
            {
                path: 'playlist',
                name: 'creator-playlist',
                component: () => import('@/pages/creator/playlist-creator'),
                meta: {
                    layout: AppLayoutsEnum.creator,
                },
            },
            {
                path: 'new-playlist',
                name: 'new-playlist-creator',
                component: () => import('@/pages/creator/add-playlist-creator'),
                meta: {
                    layout: AppLayoutsEnum.creator,
                },
            },
            {
                path: 'store',
                name: 'creator-store',
                component: () => import('@/pages/creator/store-creator'),
                meta: {
                    layout: AppLayoutsEnum.creator,
                },
            },
            {
                path: 'profile',
                name: 'creator-profile',
                component: () => import('@/pages/creator/profile-creator'),
                meta: {
                    layout: AppLayoutsEnum.creator,
                },
            },

        ],
    },
    {
        path: '/user',
        name: 'user',
        meta: {requiresAuth: true, roles: ['user']},
        children: [
            {
                path: 'home',
                name: 'user-home',
                component: () => import('@/pages/user/home-user'),
                meta: {
                    layout: AppLayoutsEnum.user,
                },
            },
            {
                path: 'latest',
                name: 'user-latest',
                component: () => import('@/pages/user/latest'),
                meta: {
                    layout: AppLayoutsEnum.user,
                },
            },
            {
                path: 'creator-public-page/:id',
                name: 'creator-public',
                component: () => import('@/pages/user/creator-public').catch(() => import('@/pages/error-page')),
                meta: {
                    layout: AppLayoutsEnum.user,
                },
            },
            {
                path: 'watch-video/:id',
                name: 'watch-video',
                component: () => import('@/pages/user/watch-video').catch(() => import('@/pages/error-page')),
                meta: {
                    layout: AppLayoutsEnum.user,
                },
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
]