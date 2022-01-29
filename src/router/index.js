import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import studentMenu from './student'
import index from './home'
import employeeMenu from './employee'
const routes = [
    employeeMenu,
    studentMenu,
    index,
    {
        path: '/student-login',
        name: 'StudentLogin',
        component: () =>
            import ( /* webpackChunkName: "EmployeeLogin" */ '../views/student/StudentLogin.vue'),
        //   beforeEnter: (to, from, next) => {
        //     console.log('authenticated',store.getters.isAuthenticated)
        //     if (store.getters.isAuthenticated) {
        //         next(from.path)
        //     } else
        //         next()
        // }

    },
    {
        path: '/employee-login',
        name: 'EmployeeLogin',
        component: () =>
            import ( /* webpackChunkName: "EmployeeLogin" */ '../views/employee/EmployeeLogin'),
        beforeEnter: (to, from, next) => {
            if (store.getters.isAuthenticated) {
                next(from.path)
            } else
                next()
        }

    },
    { path: '/:notFound(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired) && !localStorage.getItem('token')) {
        if (to.meta.typeRequired === 'employee')
            return next({ name: 'EmployeeLogin', query: { to: to.path } })
        else {
            return next(from.path)
        }
    }
    next()
})
export default router