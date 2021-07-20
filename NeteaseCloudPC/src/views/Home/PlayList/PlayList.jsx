import  { Pagination, Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';

import Main from '@/components/Main';
import topListApi from '@/api/toplist';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CateSelector from './CateSelector';
import AsyncComponent from '@/components/AsyncComponent';
import { playList } from '@/utils/utils';

const CoverItem = AsyncComponent(() => import('@/components/Covers/CoverItem'));

function matchParams(str, queryNameArr) {
    str = decodeURIComponent(str)
    let queryArr = [], reg;
    queryNameArr.map(name => {
        reg = new RegExp(`${name}\=(.+)(?=\&)`);
        let matchRes = str.match(reg);
        matchRes && queryArr.push(matchRes[1]);
    })

    reg = /(?<=\=)(.+?)\S/g;
    let matchRes = str.match(reg);
    matchRes && queryArr.push(matchRes[1]);

    return queryArr;
}

export default () => {

    const history = useHistory();

    const [playLists, setLists] = useState([]);
    const [listsInfo, setListsInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const getCatelists = useCallback(async (params = {}) => {
        setLoading(true);
        const res = await topListApi.getCateLists(params);
        setLists(res.playlists);
        setListsInfo({
            cat: res.cat,
            total: res.total
        })
        setLoading(false);
    }, [])

    // 页码变化
    const [curPage, setCurPage] = useState(1);
    function pageChange(page, pageSize) {
        setCurPage(page);
        getCatelists({
            cat: listsInfo.cat,
            offset: (page - 1) * pageSize,
        })
        history.replace(`/home/playlist?page=${page}&cat=${listsInfo.cat}`)
    }

    useEffect(async () => {
        const [page = 1, cat = '全部'] = matchParams(history.location.search, ['page', 'cat'])
        await getCatelists({cat, offset: (page - 1) * 35});
        setTimeout(() => setCurPage(Number(page)))
    }, [])

    //分类变化自动初始化为第一页
    const cat = useMemo(() => listsInfo.cat)
    useEffect(() => {
        setCurPage(1);
        history.replace(`/home/playlist?page=1&cat=${cat}`)
    }, [cat])

    return (
        <Main className="g-wrap p-pl f-pr">
            <div className="u-title f-cb">
                <h3>
                    <span className="f-ff2 d-flag">
                        { listsInfo?.cat }
                    </span>
                    <CateSelector fn={getCatelists} />
                </h3>
                <div className="u-btn f-fr u-btn-hot d-flag">
                    <span>热门</span>
                </div>
            </div>
            <Skeleton 
                active 
                loading={loading}
                paragraph={
                    {rows: 10}
                }
            >
                <ul className="m-cvrlst f-cb cate-lists">
                    {
                        playLists.map((item, i) => {
                            return (
                                <CoverItem 
                                    key={item.id + i} 
                                    {...item} 
                                    playFn={playList}
                                />
                            )
                        })
                    }
                </ul>
                <div className="search-pagination">
                    <Pagination 
                        current={curPage}
                        total={listsInfo.total} 
                        showSizeChanger={false}
                        pageSize={35}
                        onChange={pageChange}
                    />
                </div>
            </Skeleton>
        </Main>
    )
}