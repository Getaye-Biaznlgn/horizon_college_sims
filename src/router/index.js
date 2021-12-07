import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
const routes = [
  {
    path:'/',
    name:'home',
    component:Home
  },
  {
    path: '/staff',
    name: 'EmployeeMenu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "employeemenu" */ '../views/employee/EmployeeMenu.vue')
  },
  {
    path: '/student-home',
    name: 'StudentHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "studenthome" */ '../views/student/StudentHome.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
