// import store from '../../../store'
export default[
    {
        path: '/staff/department-head/module',
        name: 'TvetHeadModule',
        component: () =>
            import ( /* webpackChunkName: "DegreeHeadModule" */ '../../../views/employee/tvet_head/TvetHeadModule.vue'),
            meta:{authRequired:true, typeRequired:'employee'},
            // beforeEnter(to, from, next){
            //     if(store.getters.user.role!=='tvet_head'){
            //         next(from.path)
            //     }
            // }
   },
   {
    path: '/staff/department-head/tvet-grade-report',
    name: 'TvetHeadGradeReport',
    component: () =>
        import ( /* webpackChunkName: "TvetHeadGradeReport" */ '../../../views/employee/tvet_head/TvetHeadGradeReport.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/department-head/tvet-grade-report-preview',
    name: 'TvetHeadGradeReportPreview',
    props(route) {
        return  route.query || {}
      },
    component: () =>
        import ( /* webpackChunkName: "TvetHeadGradeReportPreview" */ '../../../views/employee/tvet_head/TvetHeadGradeReportPreview.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/tvet-department-head/dashboard',
    name: 'TvetHeadDashboard',
    component: () =>
        import ( /* webpackChunkName: "TvetHeadDashboard" */ '../../../views/employee/tvet_head/TvetHeadDashboard.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/tvet-department-head/section',
    name: 'TvetHeadSection',
    component: () =>
        import ( /* webpackChunkName: "TvetHeadSection" */ '../../../views/employee/tvet_head/TvetHeadSection.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/tvet-department-head/slip-report',
    name: 'TvetHeadSlipReport',
    component: () =>
        import ( /* webpackChunkName: "TvetHeadSlipReport" */ '../../../views/employee/tvet_head/TvetHeadSlipReport.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/tvet-department-head/slip-preview',
    name: 'TvetHeadSlipPreview',
    props(route) {
        return  route.query || {}
      },
    component: () =>
        import ( /* webpackChunkName: "TvetHeadSlipPreview" */ '../../../views/employee/tvet_head/TvetHeadSlipPreview.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/tvet-department-head/student',
    name: 'TvetHeadStudent',
    props(route) {
        return  route.query || {}
     },
    component: () =>
        import ( /* webpackChunkName: "TvetHeadStudent" */ '../../../views/employee/tvet_head/TvetHeadStudent.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/tvet-department-head/student/:studentId',
    name: 'TvetHeadStudentDetail',
    props: true,
    component: () =>
        import ( /* webpackChunkName: "TvetHeadStudentDetail" */ '../../../views/employee/tvet_head/TvetHeadStudentDetail.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/tvet-department-head/tvet-section-student/:sectionId',
    name: 'TvetSectionStudent',
    props:true,
    component: () =>
        import ( /* webpackChunkName: "TvetSectionStudent" */ '../../../views/employee/tvet_head/TvetSectionStudent.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
{
    path: '/staff/tvet-department-head/tvet-section-module/:sectionId',
    props:true,
    name: 'TvetSectionModule',
    component: () =>
        import ( /* webpackChunkName: "TvetSectioncourse" */ '../../../views/employee/tvet_head/TvetSectionModule.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='tvet_head'){
        //         next(from.path)
        //     }
        // }
},
]