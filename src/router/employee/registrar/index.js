import store from '../../../store'
export default [{
        path: '/staff/tvet-student-fee',
        name: 'TvetStudentFee',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentFee" */ '../../../views/employee/registrar/TvetStudentFee'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/staff/degree-student-fee',
        name: 'DegreeStudentFee',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentFee" */ '../../../views/employee/registrar/DegreeStudentFee'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/degreestudent/',
        name: 'DegreeStudent',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudent" */ '../../../views/employee/registrar/DegreeStudent.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/tvetstudent/',
        name: 'TvetStudent',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudent" */ '../../../views/employee/registrar/TvetStudent.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/degreestudentregistration/',
        name: 'DegreeStudentRegistration',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentRegistration" */ '../../../views/employee/registrar/degree/DegreeRegistration.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/tvetstudentregistration/',
        name: 'TvetStudentRegistration',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentRegistration" */ '../../../views/employee/registrar/tvet/TvetRegistration.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/viewcoc/',
        name: 'coc',
        component: () =>
            import ( /* webpackChunkName: "coc" */ '../../../views/employee/registrar/CocPage.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        beforeEnter(to, from, next) {
            if (store.getters.user.role !== 'registrar') {
                next(from.path)
            } else {
                next()
            }
        }
    },
    {
        path: '/graguated/',
        name: 'Graduated',
        component: () =>
            import ( /* webpackChunkName: "Graduation" */ '../../../views/employee/registrar/GraduatedStudent.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/degreegraduated/',
        name: 'DegreeGraduated',
        component: () =>
            import ( /* webpackChunkName: "DegreeGraduated" */ '../../../views/employee/registrar/DegreeGraduated.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/tvetgraduated/',
        name: 'TvetGraduated',
        component: () =>
            import ( /* webpackChunkName: "TvetGraduated" */ '../../../views/employee/registrar/TvetGraduated.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/studentcopy/',
        name: 'StudentCopy',
        component: () =>
            import ( /* webpackChunkName: "StudentCopy" */ '../../../views/employee/registrar/StudentCopy.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/degreestudentstatus/:degreeStudId',
        name: 'DegreeStudentStatus',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentStatus" */ '../../../views/employee/registrar/DegreeStudentStatus.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/tvet-student-status/:tvetStudId',
        name: 'TvetStudentStatus',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "TvetStudentStatus" */ '../../../views/employee/registrar/TvetStudentStatus.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/cocregistration/:cocId',
        name: 'CocRegistration',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "CocRegistration" */ '../../../views/employee/registrar/CocRegistration.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/addstudenttococ/:cocId',
        name: 'AddStudentTococ',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "AddStudentTococ" */ '../../../views/employee/registrar/AddStudentTococ.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/cocrequestform/:cocId',
        name: 'CocRequestForm',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "CocRequestForm" */ '../../../views/employee/registrar/CocRequest.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/registrardashboard',
        name: 'RegistrarDashboard',
        component: () =>
            import ( /* webpackChunkName: "RegistrarDashboard" */ '../../../views/employee/registrar/RegistrarDashboard.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/edit-degree-students/:studId',
        name: 'EditDegreeStudents',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "EditDegreeStudents" */ '../../../views/employee/registrar/EditDegreeStudent.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
    {
        path: '/edit-tvet-students/:studId',
        name: 'EditTvetStudents',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "EditTvetStudents" */ '../../../views/employee/registrar/EditTvetStudent.vue'),
        meta: { authRequired: true, requiredRole: "registrar", typeRequired: 'employee' },
        // beforeEnter(to, from, next) {
        //     if (store.getters.user.role !== 'registrar') {
        //         next(from.path)
        //     } else {
        //         next()
        //     }

        // }
    },
]