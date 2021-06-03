import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import userApi from '@/api/user';

const SingerItem = ({
    img1v1Url = '',
    name = '',
    mvSize = 0,
    albumSize = 0,
    id = ''
}) => {
    return (
        <div className="itm f-cb">
            <div className="cvr">
                <Link to={`/singer/${id}`} className="f-ib f-tdn">
                    <img src={img1v1Url} alt="" />
                </Link>
            </div>
            <div className="cnt">
                <h4 className="tit f-fs2">
                    <Link to={`/singer/${id}`}>{ name }</Link>
                </h4>
                <p className="s-fc3">{ albumSize }个专辑    { mvSize }个MV</p>
            </div>
        </div>
    )
}

const MyArtist = () => {

    const user = useSelector(state => state.user.profile);
    const [loading, setLoading] = useState(true);

    //获取订阅歌手
    const [artists, setArtists] = useState([]);
    const getSubscribeSinger = useCallback(async () => {
        setLoading(true);
        const res = await userApi.getSubscribeSinger(user.userId);
        setArtists(res);
        setTimeout(() => setLoading(false), 500);
    }, [])

    useEffect(() => {
        getSubscribeSinger();
    }, [])

    return (
        <Skeleton active={true} paragraph={{rows:10}} loading={loading}>
        <div className="g-wrap f-cb">
            <div className="u-title f-cb">
                <h3>
                    <span className="f-ff2">我的歌手（{ artists.length }）</span>
                </h3>
            </div>
            <div className="n-singer j-flag">
                {
                    artists.map(item => {
                        return <SingerItem key={item.id + item.name} {...item} />
                    })
                }
            </div>
        </div>
        </Skeleton>
    )
}

export default MyArtist;