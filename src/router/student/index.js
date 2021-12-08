export default{
    path: '/student-home',
    name: 'StudentHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "studenthome" */ '../../views/student/StudentHome.vue')
  }