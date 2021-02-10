import AsyncComponent from '@/components/AsyncComponent';
const Home = AsyncComponent(() => import('@/views/Home/Home'));
const Personal = AsyncComponent(() => import('@/views/Personal/Personal'));

const routes = [
    {
        path: '/',
        redirect: '/home',
        name: 'Home'
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
        children: [
            {
                path: 'abc',
                component: Personal,
                name: 'ABC',
                redirect: 'bcd'
            }
        ]
    },
    {
        path: '/personal',
        component: Personal,
        name: 'Personal'
    }
]

export default routes;