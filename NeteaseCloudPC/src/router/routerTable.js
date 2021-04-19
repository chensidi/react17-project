import AsyncComponent from '@/components/AsyncComponent';
const Home = AsyncComponent(() => import('@/views/Home/Home'));
const Personal = AsyncComponent(() => import('@/views/Personal/Personal'));
const Search = AsyncComponent(() => import('@/views/Search/Search'));
const Song = AsyncComponent(() => import('@/views/Song/Song'));
const Video = AsyncComponent(() => import('@/views/Video/Video'));
const Album = AsyncComponent(() => import('@/views/Album/Album'));
const PlayList = AsyncComponent(() => import('@/views/Album/PlayList'));
const Singer = AsyncComponent(() => import('@/views/Singer/Singer'));
const SingerSong = AsyncComponent(() => import('@/views/Singer/Song'));

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
    },
    {
        path: '/video/:id',
        component: Video,
        name: 'Video'
    },
    {
        path: '/album/:id',
        component: Album,
        name: 'Album'
    },
    {
        path: '/playlist/:id',
        component: PlayList,
        name: 'PlayList'
    },
    {
        path: '/singer/:id',
        component: Singer,
        name: 'Singer',
        children: [
            {
                path: 'song',
                component: SingerSong,
                name: 'SingerSong',
            }
        ]
    }
]

export default routes;