import store from '../../../store'
export default[
    {
        path: '/staff/dean-dashboard',
        name: 'DeanDashboard',
        component: () =>
            import ( /* webpackChunkName: "DeanDashboard" */ '../../../views/employee/dean/DeanDashboard'),
           meta:{authRequired:true,  typeRequired:'employee'},
           
         beforeEnter(to, from, next){
          if(store.getters.user.role!=='dean'){
              next(from.path)
          }
              

        }
    
        },
       {
        path: '/addteacher/',
        name: 'AddTeacher',
        component: () =>
            import ( /* webpackChunkName: "AddTeacher" */ '../../../views/employee/dean/AddTeacher.vue'),
            meta:{authRequired:true,  typeRequired:'employee'}
        },
    {
        path: '/adddepartmenthead/',
        name: 'AddDepartmentHead',
        component: () =>
            import ( /* webpackChunkName: "AddDepartmentHead" */ '../../../views/employee/dean/AddDepartmentHead.vue'),
            meta:{authRequired:true,  typeRequired:'employee'}
        },
      {
        path: '/addregistrar/',
        name: 'AddRegistrar',
        component: () =>
            import ( /* webpackChunkName: "AddRegistrar" */ '../../../views/employee/dean/AddRegistrar.vue'),
            meta:{authRequired:true,  typeRequired:'employee'}   
        },
       {
        path: '/addcashier/',
        name: 'AddCashier',
        component: () =>
            import ( /* webpackChunkName: "AddCashier" */ '../../../views/employee/dean/AddCashier.vue'),
            meta:{authRequired:true,  typeRequired:'employee'}
        },
       {
        path: '/staff/degree-department',
        name: 'DegreeDepartment',
        component: () =>
            import ( /* webpackChunkName: "DeanDashboard" */ '../../../views/employee/dean/DegreeDepartment'),
            meta:{authRequired:true,  typeRequired:'employee'}
        },
       {
        path: '/staff/tvet-department',
        name: 'TVETDepartment',
        component: () =>
            import ( /* webpackChunkName: "tvetdepartment" */ '../../../views/employee/dean/TVETDepartment'),
            meta:{authRequired:true,  typeRequired:'employee' } 
        },
      {
        path: '/staff/course-curriculum',
        name: 'CourseCurriculum',
        component: () =>
            import ( /* webpackChunkName: "coursecurriculum" */ '../../../views/employee/dean/CourseCurriculum'),
            meta:{authRequired:true,  typeRequired:'employee'}
        },
       {
        path: '/staff/module-curriculum',
        name: 'ModuleCurriculum',
        component: () =>
            import ( /* webpackChunkName: "modulecurriculum" */ '../../../views/employee/dean/ModuleCurriculum'),
            meta:{authRequired:true,  typeRequired:'employee'}
        },

]