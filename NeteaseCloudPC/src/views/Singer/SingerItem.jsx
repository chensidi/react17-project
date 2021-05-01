import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'

const SingerItem = (props) => {
    const { img1v1Url, name, id } = props;
    return (
        <li>
            <div className="u-cover u-cover-5">
                <LazyLoadImage width={130} height={130} src={img1v1Url}>
                </LazyLoadImage>
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