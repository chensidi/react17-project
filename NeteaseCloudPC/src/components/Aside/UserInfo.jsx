import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default () => {
    const user = useSelector(state => state.user.profile);

    return (
        <div className="n-myinfo s-bg s-bg-5">
            <div className="f-cb">
                <Link to="/my/music" className="head f-pr">
                    <img src={user.avatarUrl + '?param=80y80'} alt="" />
                </Link>
                <div className="info">
                    <h4 style={{overflow: 'hidden'}}>
                        <Link to="/my/music" className="nm nm-icn f-fs1 f-ib f-thide">
                            { user.nickname }
                        </Link>
                    </h4>
                    <p>
                        没有你，阴的天，极讨厌
                    </p>
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