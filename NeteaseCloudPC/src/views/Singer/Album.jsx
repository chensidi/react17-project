import { useEffect, useCallback, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import  { Pagination, message } from 'antd';

import singerApi from '@/api/singer';
import { timeToYMD, playAlbum } from '@/utils/utils';
import { Intrs } from './Singer';

const AlbumItem = (props) => {
    const { 
        picUrl,
        name,
        publishTime,
        id
    } = props;

    return (
        <li>
            <div className="u-cover u-cover-alb3">
                <LazyLoadImage width={145} height={120} src={picUrl}>
                </LazyLoadImage>
                <Link to={`/album/${id}`} className="msk"></Link>
                <i 
                    className="icon-play f-alpha f-fr" 
                    title="播放"
                    onClick={() => playAlbum(id)}
                >
                </i>
            </div>
            <p className="dec dec-1 f-thide2 f-pre">
                <Link className="tit s-fc0" to={`/album/${id}`}>
                    { name }
                </Link>
            </p>
            <p className="time">
                <span className="s-fc3">{ timeToYMD(publishTime) }</span>
            </p>
        </li>
    )
}

const Album = () => {

    const { albumSize } = useContext(Intrs);

    let { id } = useParams();
    const [lists, setLists] = useState([]);
    const [curPage, setCurPage] = useState(1);

    const getAlbum = useCallback(async (limit, offset) => {
        message.loading({
            content: '专辑获取中...',
            duration: 0,
            key: 'singerAlbum',
            style: {
                marginTop: '30vh',
            }
        });
        const res = await singerApi.getAlbum(id, limit, offset);
        setLists(res);
        message.destroy('singerAlbum')
    }, [])

    const pageChange = useCallback((page, pageSize) => {
        setCurPage(page);
        getAlbum(pageSize, (page - 1) * pageSize)
    }, [])

    useEffect(() => {
        getAlbum();
    }, [])

    return (
        <>
        <ul className="m-cvrlst m-cvrlst-alb4 f-cb">
            {
                lists.map(list => {
                    return <AlbumItem key={list.id} {...list} />
                })
            }
        </ul>
        <div className="search-pagination">
            <Pagination 
                current={curPage}
                total={albumSize} 
                showSizeChanger={false}
                pageSize={12}
                onChange={pageChange}
            />
        </div>
        </>
    )
}

export default Album;