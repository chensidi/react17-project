import { useState, useEffect, useRef, } from 'react'
import { Link, NavLink, useHistory, } from 'react-router-dom';
import { navs } from './nav';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        showSubNav: state.globalData.showSubNav
    }
}

function formatClass(i, len) {
    if (i === len - 1) {
        return 'lst';
    } else if (i === 0) {
        return 'fst';
    } else {
        return '';
    }
}

const Header = (props) => {
    const [navArr] = useState(navs);
    const [subNav] = useState([
        '推荐',
        '排行榜',
        '歌单',
        '主播电台',
        '歌手',
        '新碟上架'
    ])
    const history = useHistory();
    const searchRef = useRef(null);
    function searchHandler(e) {
        const val = e.target.value,
              keyCode = e.code;
        if (val.trim() != '' && keyCode === 'Enter') {
            history.replace({pathname: '/search', search: `?kw=${val}`})
        }
    }
    useEffect(() => {
        searchRef.current.value = decodeURIComponent(history.location.search.match(/kw=(.+)/)?.[1] || '');
    })
    return (
        <div className="g-topbar">
            <div className="m-top">
                <div className="wrap f-cb">
                    <h1 className="logo">
                        <Link to="/">网易云音乐</Link>
                    </h1>
                    <ul className="m-nav j-tflag">
                        {
                            navArr.map((item, i) => {
                                return (
                                    <li className={formatClass(i, navArr.length)} key={`nav-${i}`}>
                                        <span>
                                            <NavLink exact to={item.path} activeClassName="z-slt">
                                                <em>{item.title}</em>
                                                <sub className="cor">&nbsp;</sub>
                                            </NavLink>
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="m-tophead f-pr j-tflag">
                        <a href="/#" className="link s-fc3">登录</a>
                    </div>
                    <a href="https://music.163.com/login?targetUrl=%2Fcreatorcenter" target="_blank" className="m-topvd f-pr m-creator-center">创作者中心</a>
                    <div className="m-srch f-pr j-suggest">
                        <div className="srchbg">
                            <span className="parent">
                            <input type="text" ref={searchRef} className="txt j-flag" onKeyPress={searchHandler} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`m-subnav j-tflag ${!props.showSubNav&&'m-subnav-up'}`}>
                <div className="wrap f-pr">
                    <ul className="nav">
                        {
                            subNav.map((item,i) => {
                                return (
                                    <li key={`sub-${i}`}>
                                        <a href="/#" className={i===0 ? 'z-slt' : ''}>
                                            <em className={i===2 ? 'f-pr' :''}>
                                                {item}
                                                {
                                                    i===2 ? (
                                                        <span className="f-pa f-r-white-icon"></span>
                                                    ) : null
                                                }
                                            </em>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Header);