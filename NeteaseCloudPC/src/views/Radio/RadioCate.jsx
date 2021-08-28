import Main from '@/components/Main';
import Category from './components/Category';
import radioApi from '@/api/radio';
import { withDjRecommend, RecommendTemp } from './components/TypeRecommend';

import { useLocation, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pagination } from 'antd';


function getSearchParam(str, k) {
    const s = new URLSearchParams(str);
    return s.get(k);
}

const WrapTypeRecommend = withDjRecommend(RecommendTemp, radioApi.getHotByType, {
    limit: 20,
    title: '电台排行榜',
})

const RadioCate = () => {

    const { search } = useLocation();
    const id = getSearchParam(search, 'id');
    const [sid, setId] = useState(id);
    const [total, setTotal] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const totalRef = useRef(setTotal);

    const history = useHistory();
    const change = (cur) => {
        setCurPage(cur);
        const search = new URLSearchParams('');
        search.set('id', id);
        search.set('page', cur);
        history.replace('/home/djradio/cate?' + search.toString())
    }

    useEffect(() => {
        setId(id);
        setCurPage(1);
    }, [id])


    return (
        <Main className="g-wrap">
            <Category />
            <WrapTypeRecommend 
                title='电台排行榜' 
                params={{
                    limit: 20,
                    offset: (curPage - 1) * 20,
                    cateId: sid,
                    id: sid + curPage
                }}
                ref={totalRef}
            />
            <br />
            <div className="pagination-wrap">
                <Pagination 
                    defaultCurrent={1} 
                    total={total} 
                    pageSize={20} 
                    showSizeChanger={false}
                    current={curPage}
                    onChange={change}
                />
            </div>
        </Main>
    )
}

export default RadioCate;