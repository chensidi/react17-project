import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Skeleton, Pagination } from 'antd';

import Main from '@/components/Main';
import NavTitle from '@/components/Common/NavTitle';
import DiskWrap from './components/DiskWrap';
import DiskItem from './components/DiskItem';
import diskApi from '@/api/disk';

const subs = [
    {
        txt: '全部',
        path: '/home/disk/'
    },
    {
        txt: '华语',
        path: '/home/disk/?area=ZH'
    },
    {
        txt: '欧美',
        path: '/home/disk/?area=EA'
    },
    {
        txt: '韩国',
        path: '/home/disk/?area=KR'
    },
    {
        txt: '日本',
        path: '/home/disk/?area=JP'
    }
]

export default () => {

    // 热门新碟
    const [hotDisk, setHotDisk] = useState([]);
    const getNewDisk = useCallback(async () => {
        const res = await diskApi.getNewDisk();
        res && setHotDisk(res);
    }, [])

    // 全部新碟分类
    const [cateDisk, setCateDisk] = useState({
        albums: [],
        total: 0
    })
    const [curPage, setCurPage] = useState(1);
    const [area, setArea] = useState('ALL');
    const getNewDiskByCate = useCallback(async ({
        limit = 35,
        area = 'ALL',
        offset = 0
    } = {}) => {
        setCateDisk(prev => ({
            total: prev.total,
            albums: []
        }))
        const res = await diskApi.getNewDiskByCate({limit, area, offset});
        const { albums = [], total = 0 } = res;
        setCateDisk({ albums, total });
    }, [])

    const history = useHistory();
    const search = history.location.search;
    function pageChange(page, pageSize) { //分页改变 
        setCurPage(page);
        history.replace({pathname: '/home/disk', search: `page=${page}&area=${area}`})
    }

    function watchPageChange(search) {
        const searchParams = new URLSearchParams(search);
        console.log(searchParams.get('page'));
        const nowPage = searchParams.get('page') ?? 1;
        const nowArea = searchParams.get('area') ?? 'ALL';
        setCurPage(+nowPage);
        setArea(nowArea);
        getNewDiskByCate({ offset: (nowPage - 1) * 35, area: nowArea});
    }

    useEffect(() => {
        getNewDisk();
        document.body.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        watchPageChange(search);
    }, [search])

    return (
        <Main className="g-wrap n-alblist">
            <NavTitle title="热门新碟" subs={[]} />
            <Skeleton paragraph={{ rows: 8 }} active loading={!hotDisk.length}>
                <DiskWrap>
                    {
                        hotDisk.map(item => {
                            return <DiskItem key={item.id} {...item} />
                        })
                    }
                </DiskWrap>
            </Skeleton>
            <NavTitle title="全部新碟" subs={subs} />
            <Skeleton paragraph={{ rows: 8 }} active loading={!cateDisk.albums.length}>
                <DiskWrap>
                    {
                        cateDisk.albums.map(item => {
                            return <DiskItem key={item.id} {...item} />
                        })
                    }
                </DiskWrap>
                <div className="pagination-wrap">
                    <Pagination 
                        defaultCurrent={1} 
                        total={cateDisk.total} 
                        pageSize={35} 
                        showSizeChanger={false}
                        current={curPage}
                        onChange={pageChange}
                    />
                </div>
            </Skeleton>
        </Main>
    )
}