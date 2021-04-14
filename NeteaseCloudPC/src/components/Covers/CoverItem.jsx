import { Link } from 'react-router-dom' 

const CoverItem = (props) => {
    return (
        <li>
            <div className="u-cover u-cover-1">
                <img src={props.coverImgUrl} alt=""/>
                <Link to={`/playlist/${props.id}`} className="msk"></Link>
                <div className="bottom">
                    <a href="/#" className="icon-play f-fr"></a>
                    <span className="icon-headset"></span>
                    <span className="nb">{props.playCount}</span>
                </div>
            </div>
            <p className="dec">
                <Link to={`/playlist/${props.id}`} className={['tit s-fc0', props.elp?'f-thide':''].join(' ')}>{props.name}</Link>
            </p>
            {props.children}
        </li>
    )
}

export default CoverItem;