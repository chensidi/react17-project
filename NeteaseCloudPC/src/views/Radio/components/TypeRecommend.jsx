import NavTitle from "@/components/Common/NavTitle";
import { useLoading } from '@/utils/hooks';

import { Link } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Skeleton } from 'antd';

const RdoItem = ({
    picUrl,
    name,
    rcmdtext
}) => {
    return (
        <div className="rdo-itm">
            <Link to="" className="rdo-link f-fl">
                <LazyLoadImage 
                    width={120} 
                    height={120} 
                    src={`${picUrl}?param=200y200`}
                    placeholderSrc="http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130"
                >
                </LazyLoadImage>
            </Link>
            <div className="con">
                <h4>
                    <Link to="">{ name }</Link>
                </h4>
                <p>{ rcmdtext }</p>
            </div>
        </div>
    )
}

export const RecommendTemp = ({title, list}) => {
    return (
        <section className="type-recommend">
            <NavTitle title={title} />
            <div className="rdo-list">
                {
                    list.map(item => <RdoItem key={item.id} {...item} />)
                }
            </div>
        </section>
    )
}

export function withDjRecommend(Wrap, fn, options) {
    return forwardRef(({title, params}, ref) => {

        const [list, setList] = useState([]);
        const { loading, toggleLoad } = useLoading();
        const getRecommend = async () => {
            toggleLoad(true);
            const res = await fn(params);
            if (res.djRadios) {
                setList(res.djRadios.slice(0, options.limit));
                ref.current(res.count);
            } else {
                setList(res.slice(0, options.limit));
            }
            toggleLoad(false, 200);
        }

        useEffect(() => {
            getRecommend();
        }, [params.id])

        return <Skeleton loading={loading} active paragraph={{rows: 8, width: 300}}>
                    <Wrap list={list} title={title} />
                </Skeleton> 
    })
}