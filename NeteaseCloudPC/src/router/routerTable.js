import { lazy, Suspense } from 'react';
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
const SingerIntroduce = AsyncComponent(() => import('@/views/Singer/Introduce'));
const SingerAlbum = AsyncComponent(() => import('@/views/Singer/Album'));
const SingerMV = AsyncComponent(() => import('@/views/Singer/MV'));
const TopList = AsyncComponent(() => import('@/views/Toplist/TopList'));
const TopDetails = AsyncComponent(() => import('@/views/Toplist/Details'));
const SingerList = AsyncComponent(() => import('@/views/Singer/SingerList'));
const SingerCates = AsyncComponent(() => import('@/views/Singer/SingerCates'));
const SingerMoreCates = AsyncComponent(() => import('@/views/Singer/SingerMoreCates'));
const Login = AsyncComponent(() => import('@/views/My/Login'));
const MainPage = AsyncComponent(() => import('@/views/My/MainPage'));
const MyMusic = AsyncComponent(() => import(('@/views/My/Music')));
const MyArtist = AsyncComponent(() => import('@/views/My/MyArtist'));
const MyMv = AsyncComponent(() => import('@/views/My/MV'));

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
            },
            {
                path: 'introduce',
                component: SingerIntroduce,
                name: 'SingerIntroduce',
            },
            {
                path: 'album',
                component: SingerAlbum,
                name: 'SingerAlbum'
            },
            {
                path: 'mv',
                component: SingerMV,
                name: 'SingerMV'
            }
        ]
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
        path: '/my',
        redirect: '/my/music',
        name: 'MyProfile'
    },
    {
        path: '/my/login',
        component: Login,
        name: 'Login'
    },
    {
        path: '/user/main',
        component: MainPage,
        name: 'MyProfile'
    },
    {
        path: '/my/music',
        component: MyMusic,
        name: 'MyMusic',
        children: [
            {
                path: 'artist',
                component: MyArtist,
                name: 'MyArtist',
            },
            {
                path: 'mv',
                component: MyMv,
                name: 'MyMv',
            },
        ]
    }
]

export default routes;