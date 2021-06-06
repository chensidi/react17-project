import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from 'antd';

import userApi from '@api/user';

const DjItem = (props) => {
    return (
        <li className="z-flag">
            <Link to="" className="cvr u-cover u-cover-3 f-fl">
                <img src={props.picUrl} alt="" />
            </Link>
            <div className="col cnt f-pr">
                <h3 className="f-fw0 f-fs1 f-thide">
                    <Link to="" className="s-fc1">
                        { props.name }
                    </Link>
                </h3>
                <p className="col s-fc4">
                    by <Link to="" className="s-fc4">
                        { props.dj.nickname }
                        </Link>
                </p>
            </div>
            <div className="col no s-fc4">{ props.programCount }期</div>
        </li>
    )
}

const MyDj = () => { 

    const [djList, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const getDjList = useCallback(async () => {
        setLoading(true);
        const res = await userApi.getSubscribeDj();
        setList(res);
        setTimeout(() => setLoading(false), 500);
    }, [])

    useEffect(() => {
        getDjList();
    }, [])

    return (
        <div className="g-wrap f-cb">
            <div className="u-title f-cb">
                <h3>
                    <span className="f-ff2">我订阅的电台</span>
                </h3>
            </div>
            <Skeleton active={true} paragraph={{rows:10}} loading={loading}>
                <ul className="n-favrdi f-cb j-flag">
                    {
                        djList.map(item => {
                            return (
                                <DjItem key={item.id} {...item}  />
                            )
                        })
                    }
                </ul>
            </Skeleton>
        </div>
    )
}

export default MyDj;