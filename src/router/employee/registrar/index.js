export default [{
        path: '/staff/tvet-student-fee',
        name: 'TvetStudentFee',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentFee" */ '../../../views/employee/registrar/TvetStudentFee'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/staff/degree-student-fee',
        name: 'DegreeStudentFee',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentFee" */ '../../../views/employee/registrar/DegreeStudentFee')

        ,
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/degreestudent/',
        name: 'DegreeStudent',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudent" */ '../../../views/employee/registrar/DegreeStudent.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/tvetstudent/',
        name: 'TvetStudent',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudent" */ '../../../views/employee/registrar/TvetStudent.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/degreestudentregistration/',
        name: 'DegreeStudentRegistration',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentRegistration" */ '../../../views/employee/registrar/degree/DegreeRegistration.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/tvetstudentregistration/',
        name: 'TvetStudentRegistration',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentRegistration" */ '../../../views/employee/registrar/tvet/TvetRegistration.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/viewcoc/',
        name: 'coc',
        component: () =>
            import ( /* webpackChunkName: "coc" */ '../../../views/employee/registrar/CocPage.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/graguated/',
        name: 'Graduated',
        component: () =>
            import ( /* webpackChunkName: "Graduation" */ '../../../views/employee/registrar/GraduatedStudent.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/degreegraduated/',
        name: 'DegreeGraduated',
        component: () =>
            import ( /* webpackChunkName: "DegreeGraduated" */ '../../../views/employee/registrar/DegreeGraduated.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/tvetgraduated/',
        name: 'TvetGraduated',
        component: () =>
            import ( /* webpackChunkName: "TvetGraduated" */ '../../../views/employee/registrar/TvetGraduated.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/studentcopy/',
        name: 'StudentCopy',
        component: () =>
            import ( /* webpackChunkName: "StudentCopy" */ '../../../views/employee/registrar/StudentCopy.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/degreestudentdetail/:degreeStudId',
        name: 'DegreeStudentDetail',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentDetail" */ '../../../views/employee/registrar/DegreeStudentDetail.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/tvetstudentdetail/:tvetStudId',
        name: 'TvetStudentDetail',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentDetail" */ '../../../views/employee/registrar/TvetStudentDetail.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/cocregistration/:cocId',
        name: 'CocRegistration',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "CocRegistration" */ '../../../views/employee/registrar/CocRegistration.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
    {
        path: '/addstudenttococ/:cocId',
        name: 'AddStudentTococ',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "AddStudentTococ" */ '../../../views/employee/registrar/AddStudentTococ.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' }
    },
]