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
        name: 'TeacherStudent',
        component: () =>
            import ( /* webpackChunkName: "TeacherStudent" */ '../../../views/employee/teacher/TeacherStudent'),
            meta:{authRequired:true,  typeRequired:'employee' } 
    }, 
]