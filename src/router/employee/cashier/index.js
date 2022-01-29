import store from '../../../store'
export default [{
        path: '/staff/cashier-dashboard',
        name: 'CashierDashboard',
        component: () =>
            import ( /* webpackChunkName: "CashierDashboard" */ '../../../views/employee/cashier/CashierDashboard.vue'),
        meta: { authRequired: true, typeRequired: 'employee' },

        beforeEnter(to, from, next) {
            if (store.getters.user.role !== 'cashier') {
                next(from.path)
            } else {
                next()
            }

        }

    },
    {
        path: '/staff/payment',
        name: 'payment',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentFee" */ '../../../views/employee/cashier/ViewPayment.vue'),
        beforeEnter(to, from, next) {
            if (store.getters.user.role !== 'cashier') {
                next(from.path)
            } else {
                next()
            }

        }
    }, {
        path: '/staff/degreefee',
        name: 'DegreeFee',
        component: () =>
            import ( /* webpackChunkName: "DegreeStudentFee" */ '../../../views/employee/cashier/DegreeFee.vue'),
        beforeEnter(to, from, next) {
            if (store.getters.user.role !== 'cashier') {
                next(from.path)
            } else {
                next()
            }

        }
    },
    {
        path: '/staff/tvetfee',
        name: 'TvetFee',
        component: () =>
            import ( /* webpackChunkName: "TvetStudentFee" */ '../../../views/employee/cashier/TvetFee.vue'),
        beforeEnter(to, from, next) {
            if (store.getters.user.role !== 'cashier') {
                next(from.path)
            } else {
                next()
            }

        }
    },
    {
        path: '/staff/addnewpayment',
        name: 'AddNewPayment',
        component: () =>
            import ( /* webpackChunkName: "AddNewPayment" */ '../../../views/employee/cashier/AddNewPayment.vue'),
        beforeEnter(to, from, next) {
            if (store.getters.user.role !== 'cashier') {
                next(from.path)
            } else {
                next()
            }

        }
    },
    {
        path: '/staff/degreefeedetail/:id',
        name: 'DegreeFeedetail',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "DegreeFeedetail" */ '../../../views/employee/cashier/DegreeFeeDetail.vue'),
        beforeEnter(to, from, next) {
            if (store.getters.user.role !== 'cashier') {
                next(from.path)
            } else {
                next()
            }

        }
    },
    {
        path: '/staff/tvetfeedetail/:id',
        name: 'TvetFeedetail',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "TvetFeedetail" */ '../../../views/employee/cashier/TvetFeeDetail.vue'),
        beforeEnter(to, from, next) {
            if (store.getters.user.role !== 'cashier') {
                next(from.path)
            } else {
                next()
            }

        }
    },
]