import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

import BtnTools from '@/components/Common/BtnTools'
import albumApi from '@/api/album';
import { timeToYMD, playList, replaceHistory } from '@/utils/utils';
import { SongItem } from '@/views/Search/components';

const PlayList = () => {

    const [playListInfo, setPlayInfo] = useState({ //歌单内容
        album: null,
        songs: []
    })
    const [loading, setLoading] = useState(true);
    const getPlayListInfo = async (id) => {
        setLoading(true);
        document.body.scrollTo(0,0);
        const res = await albumApi.getPlayListInfo(id);
        setPlayInfo({
            album: res.album,
            songs: res.songs
        })
        setTimeout(() => setLoading(false), 300)
    }

    const {id} = useParams();
    useEffect(() => {
        getPlayListInfo(id);
    }, [id])

    return (
        <Skeleton 
            active 
            title={{width: 150}}
            paragraph={{rows: 15, width: 200}}
            loading={loading}
        >
            <div className="g-wrap my-createplaylist f-cb">
                <img className="cover" src={playListInfo.album?.coverImgUrl} alt="" />
                <div className="playlist-info">
                    <div className="hd">
                        <i className="type u-icn u-icn-13"></i>
                        <h2 className="f-ff2 f-thide">
                            { playListInfo.album?.name }
                        </h2>
                    </div>
                    <div className="con">
                        <img className="head" src={playListInfo.album?.creator?.avatarUrl} alt="" />
                        <em className="creator-name">{ playListInfo.album?.creator?.nickname }</em>
                        <time>{timeToYMD(playListInfo.album?.createTime)} 创建</time>
                    </div>
                    <BtnTools 
                        playHandler={() => playList(id)} 
                        addHandler={() => replaceHistory(playListInfo.songs)}
                    />
                </div>
                <div className="u-title u-title-1 f-cb">
                    <h3>
                        <span className="f-ff2">歌曲列表</span>
                    </h3>
                    <em className="sub">{ playListInfo.album?.trackCount }首歌</em>
                    <div className="more s-fc3">
                    播放：<strong>{ playListInfo.album?.playCount }</strong> 次
                    </div>
                </div>
                <div className="n-srchrst">
                    <div className="srchsongst small-tb">
                        {
                            playListInfo.songs.map((song, i) => {
                                return (
                                    <SongItem key={song.id} {...song} i={i} />
                                )
                            }) 
                        }
                    </div>
                </div>
            </div>
        </Skeleton>
    )
}

export default PlayList;