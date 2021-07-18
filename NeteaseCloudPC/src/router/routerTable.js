import { lazy, Suspense } from 'react';
import AsyncComponent from '@/components/AsyncComponent';
import homeRouter from './modules/home';
import searchRouter from './modules/search';
import singerRouter from './modules/singer';
import myRouter from './modules/my';
import friendRouter from './modules/friend';

const Personal = AsyncComponent(() => import('@/views/Personal/Personal'));
const Song = AsyncComponent(() => import('@/views/Song/Song'));
const Video = AsyncComponent(() => import('@/views/Video/Video'));
const Album = AsyncComponent(() => import('@/views/Album/Album'));
const PlayList = AsyncComponent(() => import('@/views/Album/PlayList'));



const routes = [
    ...homeRouter,
    ...searchRouter,
    ...singerRouter,
    ...myRouter,
    ...friendRouter,
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
    
]

export default routes;