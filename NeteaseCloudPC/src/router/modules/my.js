import AsyncComponent from '@/components/AsyncComponent';
const Login = AsyncComponent(() => import('@/views/My/Login'));
const MainPage = AsyncComponent(() => import('@/views/My/MainPage'));
const MyMusic = AsyncComponent(() => import(('@/views/My/Music')));
const MyArtist = AsyncComponent(() => import('@/views/My/MyArtist'));
const MyMv = AsyncComponent(() => import('@/views/My/MV'));
const MyDj = AsyncComponent(() => import('@/views/My/Dj'));

export default [
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
            {
                path: 'dj',
                component: MyDj,
                name: 'MyDj',
            },
        ]
    }
]