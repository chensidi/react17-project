import { lazy, Suspense } from 'react';
import AsyncComponent from '@/components/AsyncComponent';
import homeRouter from './modules/home';
import searchRouter from './modules/search';
import singerRouter from './modules/singer';
import myRouter from './modules/my';

const Personal = AsyncComponent(() => import('@/views/Personal/Personal'));
const Song = AsyncComponent(() => import('@/views/Song/Song'));
const Video = AsyncComponent(() => import('@/views/Video/Video'));
const Album = AsyncComponent(() => import('@/views/Album/Album'));
const PlayList = AsyncComponent(() => import('@/views/Album/PlayList'));
const TopList = AsyncComponent(() => import('@/views/Toplist/TopList'));
const TopDetails = AsyncComponent(() => import('@/views/Toplist/Details'));
const SingerList = AsyncComponent(() => import('@/views/Singer/SingerList'));
const SingerCates = AsyncComponent(() => import('@/views/Singer/SingerCates'));
const SingerMoreCates = AsyncComponent(() => import('@/views/Singer/SingerMoreCates'));


const routes = [
    ...homeRouter,
    ...searchRouter,
    ...singerRouter,
    ...myRouter,
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
]

export default routes;