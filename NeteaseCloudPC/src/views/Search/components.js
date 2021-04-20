import { Link } from 'react-router-dom';
import { mediaTimeFormat, artistsFormat, playTimesFormat } from '@/utils/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useState } from 'react';
import { playItem, addToPlay, playAlbum } from '@/utils/utils';

export const SongItem = (props) => {
    const { i, name, mv, ar, al, dt, id } = props;
    return (
        <div className={['item f-cb h-flag', i%2?'':'even'].join(' ')}>
            <div className="td">
                <div className="hd">
                    <i className="ply" onClick={() => playItem(id)}></i>
                </div>
            </div>
            <div className="td w0">
                <div className="sn">
                    <div className="text">
                        <Link to={`/song/${id}`}>{ name }</Link>
                        { mv ? <Link to={`/video/${mv}?mv=mv`} className="mv"></Link> : null }
                    </div>
                </div>
            </div>
            <div className="td">
                <div className="opt hshow">
                    <i className="u-icn u-icn-81 icn-add" onClick={() => addToPlay(id)}></i>
                    <i className="icn icn-fav"></i>
                    <i className="icn icn-share"></i>
                    <i className="icn icn-dl"></i>
                </div>
            </div>
            <div className="td w1">
                <div className="text">
                    <Link to="">{ artistsFormat(ar) }</Link>
                </div>
            </div>
            <div className="td w2">
                <div className="text">
                    <Link to="">《{al.name}》</Link>
                </div>
            </div>
            <div className="td">{ mediaTimeFormat(dt/1000) }</div>
        </div>
    )
}

export const SingerItem = (props) => {
    const { img1v1Url, name, id } = props;
    return (
        <li>
            <div className="u-cover u-cover-5">
                <Link to={`/singer/${id}`}>
                    <LazyLoadImage 
                    width={130} 
                    height={130} 
                    src={img1v1Url}
                    placeholderSrc="http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130"
                    >
                    </LazyLoadImage>
                    <span className="msk"></span>
                </Link>
            </div>
            <p>
                <Link to="" className="nm f-thide s-fc0">
                    { name }
                </Link>
                <Link to="">
                <i className="u-icn u-icn-5"></i>
                </Link>
            </p>
        </li>
    )
}

export const AlbumItem = (props) => {
    const { picUrl, name, artists, id, } = props;
    return (
        <li>
            <div className="u-cover u-cover-alb2">
                <Link to={`/album/${id}`} title={name}>
                    <LazyLoadImage width={130} height={130} src={picUrl}>
                    </LazyLoadImage>
                    <span className="msk"></span>
                </Link>
                <i 
                    className="icon-play f-alpha f-fr" 
                    onClick={() => playAlbum(id)}
                    title="播放"
                >
                </i>
            </div>
            <p className="dec">
                <Link to="" className="tit f-thide s-fc0">
                    { name }
                </Link>
            </p>
            <p>
                <span className="nm f-thide">
                    <Link to="" className="s-fc3">
                        { artistsFormat(artists) }
                    </Link>
                </span>
            </p>
        </li>
    )
}

export const VideoItem = (props) => {
    const { coverUrl, playTime, title, creator, durationms, markTypes, vid, type } = props;
    return (
        <li>
            <div className="cover f-pr">
                <LazyLoadImage width={159} height={90} src={coverUrl}>
                </LazyLoadImage>
                <span className="msk"></span>
                <p className="tr u-msk u-msk-1">
                    <span className="u-icn2 u-icn2-mv">
                    </span>
                    { playTimesFormat(playTime) }
                </p>
                <p className="bl u-msk u-msk-2">{ mediaTimeFormat(durationms/1000) }</p>
                <Link to={`/video/${vid}${type === 0 ?'?mv=mv':''}`} className="link"></Link>
            </div>
            <h4 className="title f-thide">
                { markTypes == null ? (<i className="tag u-icn2 u-icn2-smvtag"></i>) : null }
                <Link to={`/video/${vid}`} className="s-fc0">{ title }</Link>
            </h4>
            <h5 className="name f-thide">
                { markTypes != null ? 'by' : null} <Link to="" className="s-fc3">{ artistsFormat(creator, 'userName') }</Link>
            </h5>
        </li>
    )
}

export const LrcItem = (props) => {
    const { lyrics } = props;
    const [open, changeOpen] = useState(false);
    function changeOpens() {
        changeOpen(prev => !prev);
    }
    return (
        <div className="lyric">
            <div className={!open ? 'lrc_all' : ''}>
                {
                    lyrics.map(item => {
                        return (
                            <p key={item + Math.random()} dangerouslySetInnerHTML={{ __html: item }}></p>
                        )
                    })
                }
            </div>
            <div className="crl">
                <em className="s-fc3" onClick={changeOpens}>
                    展开
                    <i className={["u-icn", !open ? 'u-icn-69' : 'u-icn-70'].join(' ')}></i>
                </em>
            </div>
        </div>
    )
}

const PlayTr = (props) => {
    const { 
        i,
        coverImgUrl, 
        name, 
        trackCount, 
        creator, 
        bookCount, 
        playCount,
        id } = props;
    return (
        <tr className={["h-flag", i % 2 ? 'even' : ''].join(' ')}>
            <td className="first w0">
                <div className="hd">
                    <span className="ply"></span>
                </div>
            </td>
            <td className="w7">
                <div className="u-cover u-cover-3">
                    <Link to="" className="">
                        <LazyLoadImage width={50} height={50} src={coverImgUrl}>
                        </LazyLoadImage>
                        <span className="msk"></span>
                    </Link>
                </div>
            </td>
            <td>
                <div className="f-cb">
                    <div className="opt hshow">
                        <span className="u-icn u-icn-81"></span>
                        <span className="icn icn-fav"></span>
                        <span className="icn icn-share"></span>
                    </div>
                    <div className="tt">
                        <div className="ttc">
                            <span className="txt">
                                <Link to={`/playlist/${id}`}>
                                    <span className="s-fc7">{ name }</span>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="w11 s-fc4">
            { trackCount }首
            </td>
            <td className="w4">
                <div className="text">
                    <span className="s-fc3">
                        by
                    </span>
                    { creator.nickname } 
                    <sup className="u-icn u-icn-84"></sup>
                </div>
            </td>
            <td className="w6 s-fc4">
            收藏：<span>{ playTimesFormat(bookCount) }</span>
            </td>
            <td className="last w6 s-fc4">
            收听：<span>{ playTimesFormat(playCount) }</span>
            </td>
        </tr>
    )
}

export const PlayLists = (props) => {
    const {list = []} = props;
    return (
        <table className="m-table m-table-2 m-table-2-cover">
            <tbody>
                {
                    list.map((tr, i) => {
                        return (
                            <PlayTr key={tr.id} {...tr} i={i} /> 
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export const DJItem = (props) => {
    const { picUrl, name, dj } = props;
    return (
        <li>
            <Link to="" className="u-cover u-cover-rdi2">
                <LazyLoadImage width={150} height={150} src={picUrl}>
                </LazyLoadImage>
            </Link>
            <h3 className="f-fs2 f-thide">
                <Link to="" className="s-fc1">
                    { name }
                </Link>
            </h3>
            <p className="f-thide s-fc4">
                by <Link to="">{ dj.nickname }</Link>&nbsp;
                <sup className="u-icn2 u-icn2-music2"></sup>
                <i className={`icnfix u-icn u-icn-s-0${dj.gender} f-sep`}></i>
            </p>
        </li>
    )
}

export const UserPanel = (props) => {
    const { list } = props;
    return (
        <table className="m-table m-table-2 m-table-2-cover">
            <tbody>
                {
                    list.map((item, i) => {
                        return (
                            <tr className={`h-flag ${i%2?'even':''}`} key={item.userId}>
                            <td className="first w7">
                                <div className="u-cover u-cover-3">
                                    <Link to="">
                                        <LazyLoadImage 
                                        width={50} 
                                        height={50} 
                                        src={item.avatarUrl}
                                        placeholderSrc="http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130"
                                        >
                                        </LazyLoadImage>
                                        <span className="msk" title={item.nickname}></span>
                                    </Link>
                                </div>
                            </td>
                            <td>
                                <div className="ttc">
                                    <Link to="" className="txt f-fs1" title="牛奶咖啡组合">
                                        { item.nickname }&nbsp;
                                        <sup className="u-icn2 u-icn2-music2"></sup>
                                        <i className={`icnfix u-icn u-icn-s-0${item.gender}`}></i>
                                    </Link>
                                </div>
                                <div className="dec s-fc4 f-thide"></div>
                            </td>
                            <td className="w9">
                                <span className="u-btn u-btn-3 f-tdn">
                                    <i>关注</i>
                                </span>
                            </td>
                            <td className="w9 s-fc4">
                            歌单：{ item.playlistCount }
                            </td>
                            <td className="last w9 s-fc4">
                            粉丝：<span>{ item.followeds }</span>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export const NotResult = (props) => {
    const { num, loading } = props;
    return (
        num <= 0 && !loading ? (
            <div className="n-nmusic">
                <h3 className="f-ff2">
                    <i className="u-icn u-icn-21"></i>
                    很抱歉，未能找到相关搜索结果！
                </h3>
            </div>
        ) : null
    )
}