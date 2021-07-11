import AsyncComponent from '@/components/AsyncComponent';
const Friend = AsyncComponent(() => import('@/views/Friend/Friend'));

export default [
    {
        path: '/friend',
        component: Friend,
        name: 'Friend',
    },
]