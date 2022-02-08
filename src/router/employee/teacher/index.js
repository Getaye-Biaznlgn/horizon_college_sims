 export default[
     {
        path: '/staff/my-class',
        name: 'MyClass',
        component: () =>
            import ( /* webpackChunkName: "MyClass" */ '../../../views/employee/teacher/MyClass'),
            meta:{authRequired:true,  typeRequired:'employee' } 
    }, 
    {
        path: '/staff/instructor-student',
        name: 'TeacherDegreeStudent',
        props(route) {
            return  route.query || {}
          },
        component: () =>
            import ( /* webpackChunkName: "TeacherDegreeStudent" */ '../../../views/employee/teacher/TeacherDegreeStudent'),
            meta:{authRequired:true,  typeRequired:'employee' } 
    },
    {
        path: '/staff/instructor-tvet-student',
        name: 'TeacherTvetStudent',
        props(route) {
            return  route.query || {}
          },
        component: () =>
            import ( /* webpackChunkName: "TeacherTvetStudent" */ '../../../views/employee/teacher/TeacherTvetStudent'),
            meta:{authRequired:true,  typeRequired:'employee' } 
    },  
]