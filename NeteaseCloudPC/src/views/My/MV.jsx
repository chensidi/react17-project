import userApi from '@/api/user';
import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from 'antd';

import { VideoItem } from '@/views/Search/components';

const MV = () => {

    //我的收藏的mv
    const [mv, setMv] = useState([]);
    const [loading, setLoading] = useState(true);
    const getSubscribeMv = useCallback(async () => {
        setLoading(true);
        const res = await userApi.getSubscribeMv();
        setMv(res);
        setTimeout(() => {setLoading(false)}, 500)
    } ,[])

    useEffect(() => {
        getSubscribeMv();
    }, [])

    return (
        <Skeleton active={true} paragraph={{rows:10}} loading={loading}>
            <div className="g-wrap f-cb">
                <div className="u-title f-cb">
                    <h3>
                        <span className="f-ff2">我的视频</span>
                    </h3>
                </div>
                <div className="m-mvlist f-cb my-mv">
                    {
                        mv.map(item => {
                            return <VideoItem key={item.vid} {...item} />
                        })
                    }
                </div>
            </div>
        </Skeleton>
    )
}

export default MV;