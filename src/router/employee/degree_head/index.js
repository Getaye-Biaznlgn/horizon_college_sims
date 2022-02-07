import store from '../../../store'
export default[
    {
        path: '/staff/department-head/course',
        name: 'DegreeHeadCourse',
        component: () =>
            import ( /* webpackChunkName: "DegreeHeadCourse" */ '../../../views/employee/degree_head/DegreeHeadCourse.vue'),
            meta:{authRequired:true, typeRequired:'employee'},
            beforeEnter(to, from, next){
                console.log('hello fom before enter', store.getters.user.role)
                if(store.getters.user.role==='degree_head'){
                    next()
                }
                else{
                    next('/')
                }
            }
   },
   {
    path: '/staff/department-head/degree-grade-report',
    name: 'DegreeHeadGradeReport',
    component: () =>
        import ( /* webpackChunkName: "DegreeHeadGradeReport" */ '../../../views/employee/degree_head/DegreeHeadGradeReport.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
{
    path: '/staff/department-head/degree-grade-report-preview',
    name: 'DegreeHeadGradeReportPreview',
    props(route) {
        return  route.query || {}
      },
    component: () =>
        import ( /* webpackChunkName: "DegreeHeadGradeReportPreview" */ '../../../views/employee/degree_head/DegreeHeadGradeReportPreview.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
{
    path: '/staff/department-head/dashboard',
    name: 'DegreeHeadDashboard',
    component: () =>
        import ( /* webpackChunkName: "DegreeHeadDashboard" */ '../../../views/employee/degree_head/DegreeHeadDashboard.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
{
    path: '/staff/department-head/section',
    name: 'DegreeHeadSection',
    component: () =>
        import ( /* webpackChunkName: "DegreeHeadSection" */ '../../../views/employee/degree_head/DegreeHeadSection.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
{
    path: '/staff/department-head/slip-report',
    name: 'DegreeHeadSlipReport',
    component: () =>
        import ( /* webpackChunkName: "DegreeHeadSlipReport" */ '../../../views/employee/degree_head/DegreeHeadSlipReport.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
{
    path: '/staff/department-head/slip-preview',
    name: 'DegreeHeadSlipPreview',
    props(route) {
        return  route.query || {}
      },
    component: () =>
        import ( /* webpackChunkName: "DegreeHeadSlipPreview" */ '../../../views/employee/degree_head/DegreeHeadSlipPreview.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
{
    path: '/staff/department-head/student',
    name: 'DegreeHeadStudent',
    component: () =>
        import ( /* webpackChunkName: "DegreeHeadStudent" */ '../../../views/employee/degree_head/DegreeHeadStudent.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        props(route) {
           return  route.query || {}
        },
        beforeEnter(to, from, next){
          if(store.getters.user.role!=='degree_head'){
                next(from.path)
                return;
           }
           next()
        }
},
{
    path: '/staff/department-head/student/:studentId',
    name: 'DegreeHeadStudentDetail',
    props: true,
    component: () =>
        import ( /* webpackChunkName: "DegreeHeadStudentDetail" */ '../../../views/employee/degree_head/DegreeHeadStudentDetail.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
{
    path: '/staff/department-head/degree-section-student/:sectionId',
    name: 'DegreeSectionStudent',
    props:true,
    component: () =>
        import ( /* webpackChunkName: "DegreeSectionStudent" */ '../../../views/employee/degree_head/DegreeSectionStudent.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
{
    path: '/staff/department-head/degree-section-course/:sectionId',
    props:true,
    name: 'DegreeSectionCourse',
    component: () =>
        import ( /* webpackChunkName: "DegreeSectioncourse" */ '../../../views/employee/degree_head/DegreeSectionCourse.vue'),
        meta:{authRequired:true, typeRequired:'employee'},
        // beforeEnter(to, from, next){
        //     if(store.getters.user.role!=='degree_head'){
        //         next(from.path)
        //         return;
        //     }
        //     next()
        // }
},
]