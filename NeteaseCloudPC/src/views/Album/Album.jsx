import Main from '@/components/Main';
import { Link, useParams } from 'react-router-dom';
import albumApi from '@/api/album';
import { useEffect, useState, useCallback } from 'react';
import { artistsFormat, timeToYMD } from '@utils/utils'
import { SongItem } from '../Search/components';
import { CommentWrap } from '@/components/Comment/Comment'

const Album = () => {

    const [albumInfo, changeInfo] = useState({});
    const [songs, changeSongs] = useState([]);
    const [cmtsData, changeCmtsData] = useState({
        total: 0,
        hotCmts: [],
        cmts: []
    });

    const getAlbumInfo = useCallback(() => { //获取信息
        albumApi.getAlbumInfo(id).then(res => {
            changeInfo(res.album);
            changeSongs(res.songs);
        })
    })

    const getAlbumCmts = useCallback((id, limit = 20, offset = 0) => {
        albumApi.getAlbumCmt(id, limit, offset).then(res => {
            console.log(res);
            let dataSet = offset > 0 ? {
                ...cmtsData,
                    cmts: res.comments
            } : {
                total: res.total,
                hotCmts: res.hotComments,
                cmts: res.comments
            }
            changeCmtsData(dataSet);
        })
    })

    const changeCmts = async (page, pageSize) => {
        await getAlbumCmts(id, 20, (page - 1) * pageSize);
    }

    useEffect(() => {
        getAlbumInfo(id);
        getAlbumCmts(id);
    }, [])

    const {id} = useParams();

    return (
        <div>
            <Main className="g-bd4">
            <div className="g-mn4">
                <div className="g-mn4c">
                    <div className="g-wrap6">
                        <div className="m-lycifo">
                            <div className="f-cb">
                                <div className="cvrwrap f-cb f-pr">
                                    <div className="u-cover u-cover-6 f-fl">
                                        <img src={albumInfo.picUrl} alt=""/>
                                        <span className="msk f-alpha"></span>
                                    </div>
                                </div>
                                <div className="cnt">
                                    <div className="hd">
                                        <i className="lab u-icn u-icn-16"></i>
                                        <div className="tit">
                                            <em className="f-ff2">{ albumInfo.name }</em>
                                        </div>
                                    </div>
                                    <p className="des s-fc4">
                                        歌手：
                                        <span title="张学友">
                                            <Link to="" className="des s-fc7">{ artistsFormat(albumInfo.artists ?? []) }</Link>
                                        </span>
                                    </p>
                                    <p className="des s-fc4">
                                        发行时间:
                                        { timeToYMD(albumInfo.publishTime) }
                                    </p>
                                    <p className="des s-fc4">
                                        发行公司:
                                        { albumInfo.company }
                                    </p>
                                    <div className="m-info">
                                        <div className="btns f-cb">
                                            <div className="u-btn2 u-btn2-2 u-btni-addply f-fl">
                                                <i>
                                                    <em className="ply"></em>
                                                    播放
                                                </i>
                                            </div>
                                            <div className="u-btni u-btni-add"></div>
                                            <div className="u-btni u-btni-fav">
                                                <i>收藏</i>
                                            </div>
                                            <div className="u-btni u-btni-share">
                                                <i>分享</i>
                                            </div>
                                            <div className="u-btni u-btni-dl">
                                                <i>下载</i>
                                            </div>
                                            <div className="u-btni u-btni-cmmt">
                                                <i>评论(120)</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="n-albdesc">
                                <h3>专辑介绍：</h3>
                                <div className="f-brk">
                                    <p>
                                        { albumInfo.description }
                                    </p>
                                </div>
                            </div>
                            <div className="n-srchrst">
                                <div className="srchsongst small-tb">
                                    {
                                        songs.map((song, i) => {
                                            return (
                                                <SongItem key={song.id} {...song} i={i} />
                                            )
                                        }) 
                                    }
                                </div>
                            </div>
                            <CommentWrap 
                                {...cmtsData}
                                onChange={changeCmts}
                            />
                        </div>
                    </div>
                </div>
            </div>
            </Main>
        </div>
    )
}

export default Album;