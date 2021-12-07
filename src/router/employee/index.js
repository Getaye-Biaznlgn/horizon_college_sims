export default[
    {
        path: '/dashboard/',
        name: 'DeanDashboard',
        component: () =>
            import ( /* webpackChunkName: "DeanDashboard" */ '../../views/employee/dean/DeanDashboard')
    },
]