import { useHistory, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import Main from '@/components/Main';
import toplistApi from '@/api/toplist';
import AsideNav from './AsideNav';

const TopList = (props) => {

    const history = useHistory();
    const location = useLocation();
    const [asideData, setAside] = useState({});

    const getTopLists = useCallback(async () => { //获取榜单
        const lists =  await toplistApi.getTopLists();
        const { specialLists, globalLists } = listConvert(lists);
        history.replace(`/toplist/${specialLists.list[0].id}`);
        setAside({specialLists, globalLists});
    }, [])

    const listConvert = useCallback((lists) => { //转换榜单
        const [specialLists, globalLists] = [
            {
                title: '云音乐特色榜',
                list: lists.slice(0, 4),
            },
            {
                title: '全球媒体榜',
                list: lists.slice(4)
            }
        ];
        return {specialLists, globalLists};
    }, [])

    useEffect(() => {
        getTopLists();
    }, [])

    return (
        <Main className="g-bd3">
            <AsideNav {...asideData} />
            { props.children } 
        </Main>
    )
}

export default TopList;