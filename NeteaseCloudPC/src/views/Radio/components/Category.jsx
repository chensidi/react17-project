import radioApi from '@api/radio';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore, useSelector } from 'react-redux'; 


const CateItem = ({id, pic84x84IdUrl, name, on}) => {
    return (
        <Link 
            className={`category-item ${on&&'on'}`} 
            key={id} to={`/home/djradio/cate?id=${id}`}
        >
            <img src={pic84x84IdUrl} alt="" />
            <span>{ name }</span>
        </Link>
    )
}

//Category
export default () => {

    const [cateList, setCateLists] = useState([]);
    const store = useStore();
    const storeCates = useSelector(state => state.radioData.cates)
    const getCateList = async () => {
        console.log(storeCates)
        if (storeCates.length) {
            setCateLists(storeCates);
        } else {
            const res = await radioApi.getCateLists();
            setCateLists(res);
            store.dispatch({type: 'setCates', cates: res});
        }
    }

    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id');

    useEffect(() => {
        getCateList();
    }, []);

    return (
        <header className="category-box">
            {
                cateList.map((cate) => {
                    const on = cate.id == id;
                    return (
                        <CateItem key={cate.id} {...cate} on={on}  />
                    )
                })
            }
        </header>
    )
}