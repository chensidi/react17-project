const CoverItem = (props) => {
    return (
        <li>
            <div className="u-cover u-cover-1">
                <img src={props.coverImgUrl} alt=""/>
                <a className="msk"></a>
                <div className="bottom">
                    <a className="icon-play f-fr"></a>
                    <span className="icon-headset"></span>
                    <span className="nb">{props.playCount}</span>
                </div>
            </div>
            <p className="dec">
                <a className={['tit s-fc0', props.elp?'f-thide':''].join(' ')}>{props.name}</a>
            </p>
            {props.children}
        </li>
    )
}

export default CoverItem;