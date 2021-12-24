export default [{
        path: '/staff/payment',
        name: 'payment',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentFee" */ '../../../views/employee/cashier/ViewPayment.vue')
    }, {
        path: '/staff/degreefee',
        name: 'DegreeFee',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentFee" */ '../../../views/employee/cashier/DegreeFee.vue')
    },
    {
        path: '/staff/tvetfee',
        name: 'TvetFee',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentFee" */ '../../../views/employee/cashier/TvetFee.vue')
    },
    {
        path: '/staff/addnewpayment',
        name: 'AddNewPayment',
        component: () =>
            import ( /* webpackChunkName: "AddNewPayment" */ '../../../views/employee/cashier/AddNewPayment.vue')
    },
]