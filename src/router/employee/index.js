import dean from './dean'
import degree_head from './degree_head'
import tvet_head from './tvet_head'
import teacher from './teacher'
import registrar from './registrar'
import cashier from './cashier'
import admin from './admin'
export default {
    path: '/staff/',
    name: 'EmployeeMenu',
    component: () =>
        import ( /* webpackChunkName: "employeemenu" */ '../../views/employee/EmployeeMenu.vue'),
    meta: { authRequired: true, typeRequired: 'employee' },
    children: [{
            path: '/staff/setting',
            name: 'AccountSetting',
            component: () =>
                import ( /* webpackChunkName: "employeesetting" */ '../../views/employee/AccountSetting.vue'),
            meta: { authRequired: true, typeRequired: 'employee' },
        },
        //registrar
        ...registrar,
        ...dean,
        ...degree_head,
        ...tvet_head,
        ...teacher,
        ...cashier,
        ...admin
    ]
}