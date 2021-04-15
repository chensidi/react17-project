import { Link } from 'react-router-dom';

const SingerItem = ({img1v1Url, name, alias}) => {
    return (
        <li>
            <Link to="" className="itm f-tdn">
                <div className="head">
                    <img src={img1v1Url} alt=""/>
                </div>
                <div className="ifo">
                    <h4>
                        <span className="nm f-fs1 f-ib f-thide">{ name }</span>
                    </h4>
                    <p className="f-thide s-fc3">
                        { alias[0] }
                    </p>
                </div>
            </Link>
        </li>
    )
}

const DjItem = ({avatarUrl, nickName}) => {
    return (
        <li>
            <Link to="" className="cver">
                <img src={avatarUrl} alt="" className=""/>
            </Link>
            <div className="info">
                <p>
                    <Link to="" className="nm-icn f-thide s-fc0">{ nickName }</Link>
                </p>
                <p className="f-thide s-fc3">
                    热门主播
                </p>
            </div>
        </li>
    )
}

export const SingerBlock = ({hotSingers = []}) => {
    return (
        <>
            <div className="n-singer">
                <h3 className="v-hd3">
                    <span className="f-fl">入驻歌手</span>
                    <Link to="" className="more s-fc3">查看全部</Link>
                </h3>
            </div>
            <ul className="n-enter f-cb">
                {
                    hotSingers.map(singer => {
                        return (
                            <SingerItem key={singer.id} {...singer} />
                        )
                    })
                }
            </ul>
        </>
    )
}

export const DjBlock = ({hotDjs = []}) => {
    return (
        <>
            <div className="n-dj n-dj-1">
                <h3 className="v-hd3">
                    <span className="f-fl">热门主播</span>
                    <Link to="" className="more s-fc3">查看全部</Link>
                </h3>
            </div>
            <ul className="n-hotdj f-cb">
                {
                    hotDjs.map(dj => {
                        return (
                            <DjItem key={dj.id} {...dj} />
                        )
                    })
                }
            </ul>
        </>
    )
}