import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {useUserInfoStore} from "@/entities/user";
import {loadLayoutMiddleware, router} from "@/app/providers/router";

import {auth, db} from "@/app/providers/firebase";
import App from "@/app/App.vue";


const pinia = createPinia();
const app = createApp(App)

app.use(pinia);
app.use(router);

//auth guard
router.beforeEach((to) => {
    const requiresAuth = to.meta.requiresAuth === true;
    if (!requiresAuth) return true;

    const userInfoStore = useUserInfoStore();
    const allowedRoles = Array.isArray(to.meta.roles) ? to.meta.roles : [];

    const hasRole = userInfoStore.userInfo.roles.some(role => allowedRoles.includes(role));

    if (!hasRole) {
        switch (to.matched[0].path) {
            case '/user':
                return {name: 'login-user'}
            case '/creator':
                return {name: 'login-creator'}
            default:
                return {path: '/'}
        }
    }
    return

})


// layout
router.beforeEach(loadLayoutMiddleware);

// Title page
router.beforeEach((to) => {
    document.title = typeof to.meta.title === 'string' ? to.meta.title: 'Sport hub';
    return true
});



app.provide('firebaseAuth', auth);
app.provide('firestoreDb', db);

export {app}