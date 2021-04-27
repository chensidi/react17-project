import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';

import BtnTools from '@/components/Common/BtnTools';
import toplistApi from '@/api/toplist';
import { SongItem } from '@/views/Search/components';
import { playList } from '@utils/utils'

const TopDetails = () => {

    const location = useLocation();
    const id = location.pathname.match(/toplist\/(.+)$/)[1];
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);

    const getDetails = useCallback(async () => {
        setLoading(true);
        const res = await toplistApi.getTopDetails(id);
        setDetails(res);
        setLoading(false);
        document.querySelector('.m-back').click();
    }, [id])

    const playAlbumFn = useCallback(() => { //播放全部歌曲
        playList(id, details?.tracks);
    }, [details?.tracks, id])

    useEffect(() => {
        getDetails();
    }, [id])

    return (
        <div className="g-mn3">
            <Skeleton 
                loading={loading} 
                active 
                paragraph = {
                    {
                        rows: 10
                    }
                }
            >
            <div className="g-wrap">
                <div className="m-info m-info-rank f-cb">
                    <div className="cover u-cover u-cover-rank">
                        <img src={details.coverImgUrl} alt=""/>
                    </div>
                    <div className="cnt">
                        <div className="cntc m-info">
                            <div className="hd f-cb">
                                <h2>{ details.name }</h2>
                            </div>
                            <div className="user f-cb">
                                <i className="u-icn u-icn-57">
                                </i>
                                <span className="sep s-fc3">{ details.description }</span>
                            </div>
                            <BtnTools 
                                shareCount={details.shareCount} 
                                commentCount={details.commentCount}
                                playHandler={playAlbumFn}
                            />
                        </div>
                    </div>
                </div>
                <div className="n-srchrst">
                    <div className="srchsongst small-tb">
                        {
                            details?.tracks?.map(item => {
                                return <SongItem key={item.id} {...item} />
                            })
                        }
                    </div>
                </div>
            </div>
            </Skeleton>
        </div>
    )
}

export default TopDetails;