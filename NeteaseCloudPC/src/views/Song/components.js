import { Link } from 'react-router-dom';
import { artistsFormat, playItem, addToPlay } from '@/utils/utils';

export const SameLists = (props) => {
    const {lists} = props;
    return (
        <>
            <h3 className="u-hd3">
                <span className="f-fl">
                    包含这首歌的歌单
                </span>
            </h3>
            <ul className="m-rctlist f-cb">
                {
                    lists.map(list => {
                        return (
                            <li key={list.id}>
                                <div className="cver u-cover u-cover-3">
                                    <Link to="">
                                        <img src={list.coverImgUrl} alt=""/>
                                    </Link>
                                </div>
                                <div className="info">
                                    <p className="f-thide">
                                        <Link to="" className="sname f-fs1 s-fc0">
                                            { list.name }
                                        </Link>
                                    </p>
                                    <p>
                                        <span className="by s-fc4">
                                            by
                                        </span>
                                        <Link to="" className="nm nm f-thide s-fc3" title={list.creator.nickname}>
                                            { list.creator.nickname }
                                        </Link>
                                    </p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export const SameSongs = (props) => {
    const {songs} = props;
    return (
        <>
            <h3 className="u-hd3">
                <span className="f-fl">相似歌曲</span>
            </h3>
            <ul className="m-sglist f-cb">
                {
                    songs.map(song => {
                        return (
                            <li className="f-cb" key={song.id}>
                                <div className="txt">
                                    <div className="f-thide">
                                        <Link to="" title={song.name}>{ song.name }</Link>
                                    </div>
                                    <div className="f-thide s-fc4">
                                        <span title={artistsFormat(song.artists)}>
                                            <Link to="" className="s-fc4">{artistsFormat(song.artists)}</Link>
                                        </span>
                                    </div>
                                </div>
                                <div className="opr f-cb">
                                    <span className="play" onClick={() => playItem(song.id)}></span>
                                    <span className="add" onClick={() => addToPlay(song.id)}></span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}