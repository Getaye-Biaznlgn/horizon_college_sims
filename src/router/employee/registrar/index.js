export default[
    {
        path: '/staff/tvet-student-fee',
        name: 'TvetStudentFee',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentFee" */ '../../../views/employee/registrar/TvetStudentFee'),
            meta:{authRequired:true, requiredRole:"dean", typeRequired:'employee'}
        },
    {
        path: '/staff/degree-student-fee',
        name: 'DegreeStudentFee',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentFee" */ '../../../views/employee/registrar/DegreeStudentFee')
   
   ,meta:{authRequired:true, requiredRole:"dean", typeRequired:'employee'}     },
    {
        path: '/degreestudent/',
        name: 'DegreeStudent',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudent" */ '../../../views/employee/registrar/DegreeStudent.vue')
            ,meta:{authRequired:true, requiredRole:"dean", typeRequired:'employee'}
        },
    {
        path: '/tvetstudent/',
        name: 'TvetStudent',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudent" */ '../../../views/employee/registrar/TvetStudent.vue')
          ,meta:{authRequired:true, requiredRole:"dean", typeRequired:'employee'}
        },
    {
        path: '/degreestudentregistration/',
        name: 'DegreeStudentRegistration',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentRegistration" */ '../../../views/employee/registrar/DegreeStudentRegistration.vue')
      ,meta:{authRequired:true, requiredRole:"dean", typeRequired:'employee'}
        },
    {
        path: '/tvetstudentregistration/',
        name: 'TvetStudentRegistration',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentRegistration" */ '../../../views/employee/registrar/TvetStudentRegistration.vue')
           , meta:{authRequired:true, requiredRole:"dean", typeRequired:'employee'}
        },
]