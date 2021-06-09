import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

import loginFns from '@/utils/methods/login';

const SingerItem = ({img1v1Url, name, alias, id}) => {
    return (
        <li>
            <Link to={`/singer/${id}`} className="itm f-tdn">
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

export const UserInfo = () => {
    const user = useSelector(state => state.user.profile);
    return (
        <div className="n-myinfo s-bg s-bg-5">
            <div className="f-cb">
                <Link to="/my/music" className="head f-pr">
                    <img src={user.avatarUrl} alt="" />
                </Link>
                <div className="info">
                    <h4 style={{overflow: 'hidden'}}>
                        <Link to="/my/music" className="nm nm-icn f-fs1 f-ib f-thide vip-60">
                            { user.nickname }
                        </Link>
                        <span className="vip-level vip-1-1"></span>
                    </h4>
                    <p>
                        <Link className="u-lv u-icn2 u-icn2-lv" to="">
                            7 <i className="right u-icn2 u-icn2-lvright"></i>
                        </Link>
                    </p>
                    <div className="btnwrap f-pr">
                        <Button>签到</Button>
                    </div>
                </div>
            </div>
            <ul className="dny s-fc3 f-cb">
                <li className="fst">
                    <Link>
                        <strong>{ user.eventCount }</strong>
                        <span>动态</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <strong>{ user.follows }</strong>
                        <span>关注</span>
                    </Link>
                </li>
                <li className="lst">
                    <Link>
                        <strong>{ user.followeds }</strong>
                        <span>粉丝</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export const Login = () => {
    return (
        <div className="n-myinfo n-myinfo-1 s-bg s-bg-1">
            <p className="note s-fc3">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <span className="btn s-bg s-bg-2 f-tdn" onClick={() => loginFns.openLogin(false)}>用户登录</span>
        </div>
    )
}