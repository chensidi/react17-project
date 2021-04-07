import { Link } from 'react-router-dom';

import { playTimesFormat, mediaTimeFormat } from '@/utils/utils';

const Item = (props) => {
    const {
        vid,
        coverUrl,
        playTime,
        title,
        durationms,
        creator
    } = props;
    return (
        <li>
            <div className="u-cover u-cover-8 f-fl">
                <img src={coverUrl} alt=""/>
                <p className="ci u-msk u-msk-1">
                    <span className="u-icn2 u-icn2-mv">
                    </span>
                    { playTimesFormat(playTime) }
                </p>
                <Link to={`/video/${vid}`} className="f-link link"
                    title={title}
                >
                </Link>
            </div>
            <div className="cnt">
                <p className="tit f-thide">
                    <Link to={`/video/${vid}`} title={title}>
                        { title }
                    </Link>
                </p>
                <p className="s-fc4">{ mediaTimeFormat(durationms / 1000) }</p>
                <p className="s-fc4 f-thide">
                by <Link to="" className="s-fc4">{ creator[0].userName }</Link>
                </p>
            </div>
        </li>
    )
}

export const RelatedVdo = (props) => {
    const {relatedVdo} = props; 
    return (
        <>
            <h3 className="u-hd3">
                <span className="f-fl">相关推荐</span>
            </h3>
            <ul className="n-mvlist f-cb">
                {
                    relatedVdo.map(vdo => {
                        return (
                            <Item {...vdo} key={vdo.vid} />
                        )
                    })
                }
            </ul>
        </>
    )
}

