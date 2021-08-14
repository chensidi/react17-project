import AsyncComponent from '@/components/AsyncComponent';
const Home = AsyncComponent(() => import('@/views/Home/Home'));

const TopList = AsyncComponent(() => import('@/views/Toplist/TopList'));
const TopDetails = AsyncComponent(() => import('@/views/Toplist/Details'));
const SingerList = AsyncComponent(() => import('@/views/Singer/SingerList'));
const SingerCates = AsyncComponent(() => import('@/views/Singer/SingerCates'));
const SingerMoreCates = AsyncComponent(() => import('@/views/Singer/SingerMoreCates'));
const PlayList = AsyncComponent(() => import('@/views/Home/PlayList/PlayList'));
const Disk = AsyncComponent(() => import('@/views/Disk/Disk'));
const Radio = AsyncComponent(() => import('@/views/Radio/Radio'));

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
    {
        path: '/home/toplist',
        component: TopList,
        name: 'TopList',
        children: [
            {
                path: ':id',
                component: TopDetails,
                name: 'TopDetails',
            }
        ]
    },
    {
        path: '/home/singer',
        component: SingerList,
        name: 'SingerList',
        children: [
            {
                path: 'cate/:path',
                component: SingerCates,
                name: 'SingerCates'
            },
            {
                path: 'cate/:area/:type',
                component: SingerMoreCates,
                name: 'SingerMoreCates'
            }
        ]
    },
    {
        path: '/home/playlist',
        component: PlayList,
        name: 'PlayList'
    },
    {
        path: '/home/disk',
        component: Disk,
        name: 'Disk'
    },
    {
        path: '/home/djradio',
        component: Radio,
        name: 'Radio'
    }
]