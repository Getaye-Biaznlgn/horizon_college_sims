import Index from '../../views/home/Index.vue'
export default {
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
            path: '/',
            name: 'Home',
            component: () =>
                import ( /* webpackChunkName: "Home" */ '../../views/home/Home.vue')

        },
        {
            path: '/about',
            name: 'About',
            component: () =>
                import ( /* webpackChunkName: "About" */ '../../views/home/About.vue')

        },
        {
            path: '/academic-program',
            name: 'AcademicProgram',
            component: () =>
                import ( /* webpackChunkName: "AcademicProgram" */ '../../views/home/AcademicProgram.vue')

        },
        {
            path: '/academic-calendar',
            name: 'AcademicCalendar',
            component: () =>
                import ( /* webpackChunkName: "AcademicAcalendar" */ '../../views/home/AcademicCalendar.vue')

        },
        {
            path: '/admission',
            name: 'Admission',
            component: () =>
                import ( /* webpackChunkName: "Admission" */ '../../views/home/Admission.vue')

        },
        {
            path: '/news',
            name: 'News',
            component: () =>
                import ( /* webpackChunkName: "News" */ '../../views/home/News.vue')

        },
        {
            path: '/event',
            name: 'Event',
            component: () =>
                import ( /* webpackChunkName: "Event" */ '../../views/home/Event.vue')

        },
        {
            path: '/onlineregistration',
            name: 'OnlineRegistration',
            component: () =>
                import ( /* webpackChunkName: "OnlineRegistration" */ '../../views/home/registration/OnlineRegistration.vue')
        },

    ]
}