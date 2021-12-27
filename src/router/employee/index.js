import registrar from './registrar'
import dean from './dean'
import degree_head from './degree_head'
import tvet_head from './tvet_head'
export default{
        path: '/staff/',
        name: 'EmployeeMenu',
        component: () =>
            import ( /* webpackChunkName: "employeemenu" */ '../../views/employee/EmployeeMenu.vue'),
            meta:{authRequired:true, typeRequired:'employee'},
            children: [
                {
                  path:'/staff/setting',
                  name:'AccountSetting',
                  component: () =>
            import ( /* webpackChunkName: "employeesetting" */ '../../views/employee/AccountSetting.vue'),
            meta:{authRequired:true, typeRequired:'employee'},  
                },
            //registrar
            ...registrar,
            ...dean,
            ...degree_head,
            ...tvet_head
        ]
   }
    
     
