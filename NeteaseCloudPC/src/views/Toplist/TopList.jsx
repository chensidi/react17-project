import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import Main from '@/components/Main';
import toplistApi from '@/api/toplist';
import AsideNav from './AsideNav';

const TopList = () => {

    const [asideData, setAside] = useState({});

    const getTopLists = useCallback(async () => { //获取榜单
        const lists =  await toplistApi.getTopLists();
        const { specialLists, globalLists } = listConvert(lists);
        console.log(specialLists, globalLists);
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
            <div className="g-mn3">
                <div className="g-wrap">
                    <div className="m-info m-info-rank f-cb">
                        <div className="cover u-cover u-cover-rank">
                            <img src="http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150" alt=""/>
                            <span className="msk"></span>
                        </div>
                        <div className="cnt">
                            <div className="cntc m-info">
                                <div className="hd f-cb">
                                    <h2>飙升榜</h2>
                                </div>
                                <div className="user f-cb">
                                    <i className="u-icn u-icn-57">
                                    </i>
                                    <span className="sep s-fc3">最近更新：04月25日</span>
                                    <span className="s-fc4">
                                    （每天更新）
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default TopList;