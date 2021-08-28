import NavTitle from "@/components/Common/NavTitle";

import { Link } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";


const RdoItem = ({
    picUrl,
    name,
    rcmdtext
}) => {
    return (
        <div className="rdo-itm">
            <Link to="" className="rdo-link f-fl">
                <img src={`${picUrl}?param=200y200`} alt="" />
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
        const getRecommend = async () => {
            const res = await fn(params);
            if (res.djRadios) {
                setList(res.djRadios.slice(0, options.limit));
                ref.current(res.count);
            } else {
                setList(res.slice(0, options.limit));
            }
        }

        useEffect(() => {
            getRecommend();
        }, [params.id])

        return <Wrap list={list} title={title} />
    })
}