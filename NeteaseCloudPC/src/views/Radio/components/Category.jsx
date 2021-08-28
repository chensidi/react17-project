import radioApi from '@api/radio';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const CateItem = ({id, pic84x84IdUrl, name}) => {
    return (
        <Link 
            className="category-item" 
            key={id} to={`/home/djradio/cate?id=${id}`}
        >
            <img src={pic84x84IdUrl} alt="" />
            <span>{ name }</span>
        </Link>
    )
}

//Category
export default () => {

    const [cateList, setCateLists] = useState([])
    const getCateList = async () => {
        const res = await radioApi.getCateLists();
        setCateLists(res);
    }

    useEffect(() => {
        getCateList();
    }, []);

    return (
        <header className="category-box">
            {
                cateList.map((cate) => {
                    return (
                        <CateItem key={cate.id} {...cate}  />
                    )
                })
            }
        </header>
    )
}