import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
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
    const location = useLocation();
    const history = useHistory();
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
        getMVs(pageSize, (page - 1) * pageSize);
        history.replace(history.location.pathname + `?page=${page}`)
    }, [])

    const computedPage = useCallback(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const page = location.search.match(/\=(.+)$/)[1];
                setCurPage(Number(page));
                resolve(Number(page));
            })
        })
    })

    useEffect(async () => {
        const page = await computedPage();
        getMVs(12, 12 * (page - 1));
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