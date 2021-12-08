export default{
    path: '/staff',
    name: 'EmployeeMenu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "employeemenu" */ '../../views/employee/EmployeeMenu.vue'),
    children:[
    {
        path: '/staff/',
        name: 'DeanDashboard',
        component: () =>
            import ( /* webpackChunkName: "DeanDashboard" */ '../../views/employee/dean/DeanDashboard')
    },
    {
        path: '/staff/degree-department',
        name: 'DegreeDepartment',
        component: () =>
            import ( /* webpackChunkName: "DeanDashboard" */ '../../views/employee/dean/DegreeDepartment')
    },
    {
        path: '/staff/tvet-department',
        name: 'TVETDepartment',
        component: () =>
            import ( /* webpackChunkName: "tvetdepartment" */ '../../views/employee/dean/TVETDepartment')
    },
    {
        path: '/staff/course-curriculum',
        name: 'CourseCurriculum',
        component: () =>
            import ( /* webpackChunkName: "coursecurriculum" */ '../../views/employee/dean/CourseCurriculum')
    },
    {
        path: '/staff/module-curriculum',
        name: 'ModuleCurriculum',
        component: () =>
            import ( /* webpackChunkName: "modulecurriculum" */ '../../views/employee/dean/ModuleCurriculum')
    },
]
  
  }


