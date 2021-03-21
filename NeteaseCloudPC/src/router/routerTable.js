import AsyncComponent from '@/components/AsyncComponent';
const Home = AsyncComponent(() => import('@/views/Home/Home'));
const Personal = AsyncComponent(() => import('@/views/Personal/Personal'));
const Search = AsyncComponent(() => import('@/views/Search/Search'));
const Song = AsyncComponent(() => import('@/views/Song/Song'));

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
    },
    {
        path: '/personal',
        component: Personal,
        name: 'Personal'
    },
    {
        path: '/search/:kw',
        component: Search,
        name: 'Search'
    },
    {
        path: '/song/:id',
        component: Song,
        name: 'Song'
    }
]

export default routes;