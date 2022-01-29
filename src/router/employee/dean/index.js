// import store from '../../../store'
export default[
    {
        path: '/staff/dean-dashboard',
        name: 'DeanDashboard',
        component: () =>
            import ( /* webpackChunkName: "DeanDashboard" */ '../../../views/employee/dean/DeanDashboard'),
           meta:{authRequired:true,  typeRequired:'employee'},
           
        //  beforeEnter(to, from, next){
        //   if(store.getters.user.role!=='dean'){
        //       next(from.path)
        //   }
        //   else{
        //       next()
        //   }  
        // }
    
        },
       {
        path: '/addteacher/',
        name: 'AddTeacher',
        props(route) {
            return  route.query || {}
          },
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
        {
            path: '/staff/manage-fee',
            name: 'ManageFeeAmount',
            component: () =>
                import ( /* webpackChunkName: "managefee" */ '../../../views/employee/dean/ManageFeeAmount'),
                meta:{authRequired:true,  typeRequired:'employee'}
         },
      
         {
            path: '/staff/manage-news',
            name: 'ManageNews',
            component: () =>
                import ( /* webpackChunkName: "ManageNews" */ '../../../views/employee/dean/ManageNews'),
                meta:{authRequired:true,  typeRequired:'employee'}
         },
         {
            path: '/staff/manage-event',
            name: 'ManageEvent',
            component: () =>
                import ( /* webpackChunkName: "ManageEvent" */ '../../../views/employee/dean/ManageEvent'),
                meta:{authRequired:true,  typeRequired:'employee'}
         },
         {
            path: '/staff/manage-employee-account',
            name: 'EmployeeAccount',
            component: () =>
                import ( /* webpackChunkName: "EmployeeAccount" */ '../../../views/employee/dean/EmployeeAccount'),
                meta:{authRequired:true,  typeRequired:'employee'}
         },
         {
            path: '/staff/manage-student-account',
            name: 'StudentAccount',
            component: () =>
                import ( /* webpackChunkName: "StudentAccount" */ '../../../views/employee/dean/StudentAccount'),
                meta:{authRequired:true,  typeRequired:'employee'}
         },
         {
            path: '/staff/student-gallery',
            name: 'StudentGallery',
            component: () =>
                import ( /* webpackChunkName: "StudentGallery" */ '../../../views/employee/dean/StudentGallery'),
                meta:{authRequired:true,  typeRequired:'employee'}
         },
         {
            path: '/staff/add-new-academic-year',
            name: 'AddNewAcademicYear',
            component: () =>
                import ( /* webpackChunkName: "AddNewAcademicYear" */ '../../../views/employee/dean/AddNewAcademicYear'),
                meta:{authRequired:true,  typeRequired:'employee' } 
          }, 
          {
            path: '/staff/selected-academic-year-detail',
            name: 'SelectedAcademicYearDetail',
            component: () =>
                import ( /* webpackChunkName: "SelectedAcademicYearDetail" */ '../../../views/employee/dean/SelectedAcademicYearDetail'),
                meta:{authRequired:true,  typeRequired:'employee' } 
          }, 
          {
            path: '/staff/academic-setting',
            name: 'AcademicSetting',
            component: () =>
                import ( /* webpackChunkName: "AcademicSetting" */ '../../../views/employee/dean/AcademicSetting'),
                meta:{authRequired:true,  typeRequired:'employee' } 
          }, 
]