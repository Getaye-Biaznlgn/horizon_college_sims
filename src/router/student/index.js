export default{
    path: '/student-home',
    name: 'StudentHome',
    component: () => import(/* webpackChunkName: "studenthome" */ '../../views/student/StudentHome.vue'),
    children:[
      {
        path: '/my-tution-fee',
        name: 'MyTutionFee',
        component: () => import(/* webpackChunkName: "MyTutionFee" */ '../../views/student/MyTutionFee.vue')
        
      },
      {
        path: '/my-course',
        name: 'MyCourse',
        component: () => import(/* webpackChunkName: "MyCourse" */ '../../views/student/MyCourse.vue')
        
      },
      {
        path: '/my-grade',
        name: 'MyGrade',
        component: () => import(/* webpackChunkName: "MyGrade" */ '../../views/student/MyGrade.vue')
      },
      {
        path: '/my-status',
        name: 'MyStatus',
        component: () => import(/* webpackChunkName: "MyStatus" */ '../../views/student/MyStatus.vue')
      },
      {
        path: '/my-coc',
        name: 'MyCOC',
        component: () => import(/* webpackChunkName: "MyCOC" */ '../../views/student/MyCOC.vue')
      },
      {
        path: '/my-section',
        name: 'MySection',
        component: () => import(/* webpackChunkName: "MySection" */ '../../views/student/MySection.vue')
      }
    ]
  }