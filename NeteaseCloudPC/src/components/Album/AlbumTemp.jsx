import Main from '@/components/Main';
import { Link } from 'react-router-dom';
import { artistsFormat, timeToYMD } from '@utils/utils'
import { SongItem } from '@/views/Search/components';
import { CommentWrap } from '@/components/Comment/Comment'
import BtnTools from '@/components/Common/BtnTools';

const AlbumTemp = (props) => {
    const { 
        albumInfo,
        playAlbumFn,
        songs,
        cmtsData,
        changeCmts,
        flag
    } = props;
    return (
        <Main className="g-bd4">
            <div className="g-mn4">
                <div className="g-mn4c">
                    <div className="g-wrap6">
                        <div className="m-lycifo m-info">
                            <div className="f-cb">
                                <div className="cvrwrap f-cb f-pr">
                                    <div className="u-cover u-cover-6 f-fl">
                                        <img src={albumInfo.picUrl || albumInfo.coverImgUrl} alt=""/>
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
                                    {
                                        flag === 'album' ?
                                        <>
                                            <p className="des s-fc4">
                                                歌手：
                                                <span title={artistsFormat(albumInfo.artists ?? [])}>
                                                    <Link to={`/singer/${albumInfo?.artist?.id}`} className="des s-fc7">{ artistsFormat(albumInfo.artists ?? []) }</Link>
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
                                        </>
                                        : <>
                                            <div className="user f-cb userow">
                                                <Link to="" className="face">
                                                    <img src={albumInfo?.creator?.avatarUrl} alt=""/>
                                                </Link>
                                                <span className="name">
                                                    <Link to="" className="s-fc7">{ albumInfo?.creator?.nickname }</Link>
                                                </span>
                                                <span className="time s-fc4">{ timeToYMD(albumInfo.createTime) } 创建</span>
                                            </div>
                                          </>
                                    }
                                    <BtnTools 
                                        commentCount={cmtsData.total} 
                                        {...albumInfo.info} 
                                        playHandler={playAlbumFn} 
                                    />
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
    )
}

export default  AlbumTemp;