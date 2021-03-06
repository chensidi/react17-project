import { useParams, useHistory } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import  { Pagination, message } from 'antd';

import { SongItem } from '@/views/Search/components';
import singerApi from '@/api/singer';

const Song = () => {

    const { id } = useParams();
    const [lists, setLists] = useState([]);
    const [total, setTotal] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const history = useHistory();

    const getSongs = useCallback(async (limit, offset) => { //获取歌曲
        message.loading({
            content: '歌曲获取中...',
            duration: 0,
            key: 'singerSong',
            style: {
                marginTop: '30vh',
            }
        });
        const {songs=[], total=0} = await singerApi.getSongs(id, limit, offset);
        setLists(songs);
        setTotal(total);
        setTimeout(() => message.destroy('singerSong'), 500);
    }, [id])

    const pageChange = useCallback((page, pageSize) => { //分页
        setCurPage(page);
        getSongs(pageSize, (page - 1) * pageSize);
        history.replace(history.location.pathname + `?page=${page}`)
    }, [id])

    const computedPage = useCallback(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const page = history.location.search.match(/\=(.+)$/)[1];
                setCurPage(Number(page));
                resolve(Number(page));
            })
        })
    })

    useEffect(async () => {
        const page = await computedPage();
        getSongs(21, 20 * (page - 1));
    }, [id])

    return (
        <div className="n-srchrst">
            <div className="srchsongst small-tb">
                {
                    lists.map(item => {
                        return <SongItem key={item.id} {...item} />
                    })
                }
            </div>
            <div className="search-pagination">
                <Pagination 
                    current={curPage}
                    total={total} 
                    showSizeChanger={false}
                    pageSize={20}
                    onChange={pageChange}
                />
            </div>
        </div>
    )
}

export default Song;