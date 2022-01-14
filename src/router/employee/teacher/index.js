 export default[
     {
        path: '/staff/my-class',
        name: 'MyClass',
        component: () =>
            import ( /* webpackChunkName: "MyClass" */ '../../../views/employee/teacher/MyClass'),
            meta:{authRequired:true,  typeRequired:'employee' } 
    }, 
    {
        path: '/staff/instructor-student/:id',
        name: 'TeacherDegreeStudent',
        props:true,
        component: () =>
            import ( /* webpackChunkName: "TeacherDegreeStudent" */ '../../../views/employee/teacher/TeacherDegreeStudent'),
            meta:{authRequired:true,  typeRequired:'employee' } 
    },
    {
        path: '/staff/instructor-tvet-student/:id',
        name: 'TeacherTvetStudent',
        props:true,
        component: () =>
            import ( /* webpackChunkName: "TeacherTvetStudent" */ '../../../views/employee/teacher/TeacherTvetStudent'),
            meta:{authRequired:true,  typeRequired:'employee' } 
    },  
]