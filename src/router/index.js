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
        beforeEnter: (to, from, next) => {
            if (store.getters.isAuthenticated) {
                next(from.path)
            } else
                next()
        }

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
    if (to.matched.some(record => record.meta.authRequired && record.meta.typeRequired === 'employee') && !localStorage.getItem('token')) {
        return next({ name: 'EmployeeLogin', query: { to: to.path } })
    } else if (to.matched.some(record => record.meta.studentAuth) && !localStorage.getItem('studentToken') && to.meta.typeRequired === 'student') {
        return next({ name: 'StudentLogin', query: { to: to.path } })
    }
    return next()
})
export default router