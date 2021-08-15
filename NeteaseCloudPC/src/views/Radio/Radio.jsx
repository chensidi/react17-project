import Main from '@components/Main';
import Category from './components/Category';
import Recommend from './components/Recommend';
import TypeRecommend from './components/TypeRecommend';

const types = [
    {
        title: '音乐推荐',
        id: 2
    },
    {
        title: '生活',
        id: 6
    },
    {
        title: '情感',
        id: 3
    },
    {
        title: '创作翻唱',
        id: 2001
    },
    {
        title: '知识',
        id: 11
    }
]

export default () => {
    return (
        <Main className="g-wrap">
            <Category />
            <Recommend />
            {
                types.map((item) => {
                    return <TypeRecommend key={item.id} {...item} />
                })
            }
        </Main>
    )
}