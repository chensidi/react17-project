import { Link, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import  { Pagination, message } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component'

import singerApi from '@/api/singer';
import { Intrs } from './Singer';

const MVItem = (props) => {
    const {
        id,
        imgurl,
        name
    } = props;
    return (
        <li>
            <div className="u-cover u-cover-7">
                <LazyLoadImage width={137} height={103} src={imgurl}>
                </LazyLoadImage>
                <Link to={`/video/${id}?mv=mv`} className="msk"></Link>
                <Link to={`/video/${id}?mv=mv`} className="icon-play f-alpha"></Link>
            </div>
            <p className="dec">
                <Link to={`/video/${id}?mv=mv`} className="tit f-thide s-fc0">{ name }</Link>
            </p>
        </li>
    )
}

const SingerMV = () => {

    const { mvSize } = useContext(Intrs);
    const { id } = useParams();
    const [lists, setLists] = useState([]);
    const [curPage, setCurPage] = useState(1);

    const getMVs = useCallback(async (limit, offset) => {
        const res = await singerApi.getMv(id, limit, offset);
        setLists(res);
    }, [])

    const pageChange = useCallback((page, pageSize) => {
        setCurPage(page);
        getMVs(pageSize, (page - 1) * pageSize)
    }, [])

    useEffect(() => {
        getMVs();
    }, [])

    return (
        <>
            <ul className="m-cvrlst m-cvrlst-7 f-cb">
                {
                    lists.map(item => {
                        return <MVItem key={item.id} {...item} />
                    })
                }
            </ul>
            <div className="search-pagination">
                <Pagination 
                    current={curPage}
                    total={mvSize} 
                    showSizeChanger={false}
                    pageSize={12}
                    onChange={pageChange}
                />
            </div>
        </>
    )
}

export default SingerMV;