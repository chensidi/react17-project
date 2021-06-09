import AsyncComponent from '@/components/AsyncComponent';
const Home = AsyncComponent(() => import('@/views/Home/Home'));

export default [
    {
        path: '/',
        redirect: '/home',
        name: 'Home'
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
    },
]