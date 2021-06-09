import AsyncComponent from '@/components/AsyncComponent';
const Search = AsyncComponent(() => import('@/views/Search/Search'));

export default [
    {
        path: '/search/:kw',
        component: Search,
        name: 'Search'
    },
]