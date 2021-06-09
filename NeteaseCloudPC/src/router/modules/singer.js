import AsyncComponent from '@/components/AsyncComponent';
const Singer = AsyncComponent(() => import('@/views/Singer/Singer'));
const SingerSong = AsyncComponent(() => import('@/views/Singer/Song'));
const SingerIntroduce = AsyncComponent(() => import('@/views/Singer/Introduce'));
const SingerAlbum = AsyncComponent(() => import('@/views/Singer/Album'));
const SingerMV = AsyncComponent(() => import('@/views/Singer/MV'));

export default [
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
]