export default [{
        path: '/dashboard/',
        name: 'DeanDashboard',
        component: () =>
            import ( /* webpackChunkName: "DeanDashboard" */ '../../views/employee/dean/DeanDashboard')
    },
    {
        path: '/addteacher/',
        name: 'AddTeacher',
        component: () =>
            import ( /* webpackChunkName: "AddTeacher" */ '../../views/employee/dean/AddTeacher.vue')
    },
    {
        path: '/adddepartmenthead/',
        name: 'AddDepartmentHead',
        component: () =>
            import ( /* webpackChunkName: "AddDepartmentHead" */ '../../views/employee/dean/AddDepartmentHead.vue')
    },
    {
        path: '/addregistrar/',
        name: 'AddRegistrar',
        component: () =>
            import ( /* webpackChunkName: "AddRegistrar" */ '../../views/employee/dean/AddRegistrar.vue')
    },
    {
        path: '/addcashier/',
        name: 'AddCashier',
        component: () =>
            import ( /* webpackChunkName: "AddCashier" */ '../../views/employee/dean/AddCashier.vue')
    },
]