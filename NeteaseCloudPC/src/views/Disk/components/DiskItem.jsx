import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { artistsFormat, playAlbum } from "@/utils/utils";

export default (props) => {

    const {
        picUrl,
        name,
        artists,
        id
    } = props;

    return (
        <li>
            <div className="u-cover u-cover-alb2">
                <LazyLoadImage 
                    width={130} 
                    height={130} 
                    src={`${picUrl}?param=130y130`}
                    placeholderSrc="http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130"
                >
                </LazyLoadImage>
                <Link to={`/album/${id}`} className="msk" title={name}></Link>
                <span className="icon-play f-alpha f-fr" title="播放" onClick={() => playAlbum(id)}></span>
            </div>
            <p className="dec">
                <Link to={`/album/${id}`} className="tit f-thide s-fc0" title={name}>{name}</Link>
            </p>
            <p className="f-thide">
                <span className="nm f-thide" title="薛之谦">
                    <Link to="" className="s-fc3" title={artistsFormat(artists)}>{ artistsFormat(artists) }</Link>
                </span>
            </p>
        </li>
    )
}