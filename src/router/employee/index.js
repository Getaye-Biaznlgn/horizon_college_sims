export default {
    path: '/staff',
    name: 'EmployeeMenu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "employeemenu" */ '../../views/employee/EmployeeMenu.vue'),
    children: [{
            path: '/staff/',
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
        {
            path: '/degreestudent/',
            name: 'DegreeStudent',
            component: () =>
                import ( /* webpackChunkName: "DegreeStudent" */ '../../views/employee/registrar/DegreeStudent.vue')
        },
        {
            path: '/tvetstudent/',
            name: 'TvetStudent',
            component: () =>
                import ( /* webpackChunkName: "DegreeStudent" */ '../../views/employee/registrar/TvetStudent.vue')
        },
        {
            path: '/degreestudentregistration/',
            name: 'DegreeStudentRegistration',
            component: () =>
                import ( /* webpackChunkName: "DegreeStudentRegistration" */ '../../views/employee/registrar/DegreeStudentRegistration.vue')
        },
        {
            path: '/tvetstudentregistration/',
            name: 'TvetStudentRegistration',
            component: () =>
                import ( /* webpackChunkName: "TvetStudentRegistration" */ '../../views/employee/registrar/TvetStudentRegistration.vue')
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