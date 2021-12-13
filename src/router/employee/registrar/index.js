export default[
    {
        path: '/staff/tvet-student-fee',
        name: 'TvetStudentFee',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentFee" */ '../../../views/employee/registrar/TvetStudentFee')
    },
    {
        path: '/staff/degree-student-fee',
        name: 'DegreeStudentFee',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentFee" */ '../../../views/employee/registrar/DegreeStudentFee')
    },
]