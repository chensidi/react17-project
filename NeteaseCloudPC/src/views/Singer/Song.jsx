import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import  { Pagination, message } from 'antd';

import { SongItem } from '@/views/Search/components';
import singerApi from '@/api/singer';

const Song = () => {

    const { id } = useParams();
    const [lists, setLists] = useState([]);
    const [total, setTotal] = useState(0);
    const [curPage, setCurPage] = useState(1);

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
    }, [])

    const pageChange = useCallback((page, pageSize) => { //分页
        setCurPage(page);
        getSongs(pageSize, (page - 1) * pageSize);
    }, [])

    useEffect(() => {
        getSongs();
    }, [])

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