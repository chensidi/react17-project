import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'

const SingerItem = (props) => {
    const { img1v1Url, name, id, picUrl } = props;
    return (
        <li>
            <div className="u-cover u-cover-5">
                <LazyLoadImage 
                    width={130} 
                    height={130} 
                    src={picUrl + '?param=130y130'}
                    placeholderSrc="http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130"
                >
                </LazyLoadImage>
                {/* <div className="singer-bg" style={{backgroundImage: `url(${img1v1Url})`}}>
                </div> */}
                <Link className="msk" title={`${name}的主页`} to={`/singer/${id}`}></Link>
            </div>
            <p>
                <Link to={`/singer/${id}`} className="nm nm-icn f-thide s-fc0">{ name }</Link>
                <Link to={`/singer/${id}`} className="f-tdn">
                    <i className="u-icn u-icn-5"></i>
                </Link>
            </p>
        </li>
    )
}

export default SingerItem;