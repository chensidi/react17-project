import  { Pagination, message } from 'antd';
import Main from '@/components/Main';
import topListApi from '@/api/toplist';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CateSelector from './CateSelector';
import AsyncComponent from '@/components/AsyncComponent';
import { playList } from '@/utils/utils';

const CoverItem = AsyncComponent(() => import('@/components/Covers/CoverItem'));

export default () => {

    const [playLists, setLists] = useState([]);
    const [listsInfo, setListsInfo] = useState({});
    const getCatelists = useCallback(async (params = {}) => {
        const res = await topListApi.getCateLists(params);
        console.log(res);
        setLists(res.playlists);
        setListsInfo({
            cat: res.cat,
            total: res.total
        })
    }, [])

    const [curPage, setCurPage] = useState(1);
    function pageChange(page, pageSize) {
        setCurPage(page);
        getCatelists({
            cat: listsInfo.cat,
            offset: (page - 1) * pageSize,
        })
    }

    useEffect(() => {
        getCatelists();
    }, [])

    const cat = useMemo(() => listsInfo.cat)
    useEffect(() => {
        setCurPage(1)
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
        </Main>
    )
}