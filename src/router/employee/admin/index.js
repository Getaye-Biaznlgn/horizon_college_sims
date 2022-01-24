export default[
    {
       path: '/staff/admin-dashboard',
       name: 'AdminDashboard',
       component: () =>
           import ( /* webpackChunkName: "AdminDashboard" */ '../../../views/employee/admin/AdminDashboard'),
           meta:{authRequired:true,  typeRequired:'employee' } 
   }, 
   {
    path: '/staff/admin-payment',
    name: 'ThePayment',
    component: () =>
        import ( /* webpackChunkName: "ThePayment" */ '../../../views/employee/admin/ThePayment'),
        meta:{authRequired:true,  typeRequired:'employee' } 
   }, 
   {
    path: '/staff/dean-management',
    name: 'TheDean',
    component: () =>
        import ( /* webpackChunkName: "TheDean" */ '../../../views/employee/admin/TheDean'),
        meta:{authRequired:true,  typeRequired:'employee' } 
   }, 
   {
    path: '/staff/degree-resource',
    name: 'DegreeFile',
    component: () =>
        import ( /* webpackChunkName: "degree" */ '../../../views/employee/admin/DegreeFile'),
        meta:{authRequired:true,  typeRequired:'employee' } 
   }, 
   {
    path: '/staff/tvet-resource',
    name: 'TvetFile',
    component: () =>
        import ( /* webpackChunkName: "TvetFile" */ '../../../views/employee/admin/TvetFile'),
        meta:{authRequired:true,  typeRequired:'employee' } 
   }, 
   {
    path: '/staff/resource-detail',
    name: 'FileDetail',
    component: () =>
        import ( /* webpackChunkName: "FileDetail" */ '../../../views/employee/admin/FileDetail'),
        meta:{authRequired:true,  typeRequired:'employee' } 
   }, 
   {
    path: '/staff/income-per-day',
    name: 'IncomePerDay',
    component: () =>
        import ( /* webpackChunkName: "IncomePerDay" */ '../../../views/employee/admin/IncomePerDay'),
        meta:{authRequired:true,  typeRequired:'employee' } 
   }, 
]