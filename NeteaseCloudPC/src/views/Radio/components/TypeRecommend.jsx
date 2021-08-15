import NavTitle from "@/components/Common/NavTitle";
import radioApi from "@api/radio";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


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

export default ({title, id}) => {


    const [list, setList] = useState([]);
    const getRecommend = async () => {
        const res = await radioApi.getRecommendByType(id);
        setList(res.slice(0, 4));
    }

    useEffect(() => {
        getRecommend();
    }, [])

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