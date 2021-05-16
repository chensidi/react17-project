import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { navs, subNav } from './nav';
import { useSelector } from 'react-redux';
import { Popover } from 'antd';

import loginFun from '@/utils/methods/login';

function formatClass(i, len) {
    if (i === len - 1) {
        return 'lst';
    } else if (i === 0) {
        return 'fst';
    } else {
        return '';
    }
}

const MyList = () => { //我的列表
    const history = useHistory();
    const { location: {pathname} } = history;
    const logout = () => {
        // console.log(pathname);
        loginFun.logout();
        if (pathname === '/my/main') {
            history.replace('/')
        }
    }
    return (
        <>
            <Link to="/my/main" className="my-item">我的主页</Link>
            <p className="my-item" onClick={logout}>退出</p>
        </>
    )
}

const Header = (props) => {
    const history = useHistory();
    const searchRef = useRef(null);
    const [activeSub, setActive] = useState(0);
    const showSubNav = useSelector(state => state.globalData.showSubNav);
    const user = useSelector(state => state.user);
    function searchHandler(e) {
        const val = e.target.value,
              keyCode = e.code;
        if (val.trim() != '' && keyCode === 'Enter') {
            history.push(`/search/${encodeURIComponent(val)}`)
        }
    }
    useEffect(() => {
        searchRef.current.value = decodeURIComponent(kw);
        if (!kw) return;
        try {
            document.querySelector('.srch.j-flag').value = kw
            setTimeout(() => {
                document.querySelector('.btn.j-flag').click();
            }, 10)
        } catch (err) {
            console.log(err);
        }
    })

    useEffect(() => {
        const { pathname } = history.location;
        setActive(getActiveSub(pathname))
    }, [history.location.pathname])

    const getActiveSub = useCallback((pathname) => {
        if (pathname === '/home') {
            return 0;
        }
    return subNav.findIndex(item => item.path !== '' && pathname.includes(item.path))
    }, [])

    const kw = useRouteMatch('/search/:kw')?.params?.kw || '';

    const goLogin = () => {
        const needJump = history.location.pathname === '/my/login';
        loginFun.openLogin(needJump);
    }
    
    return (
        <div className="g-topbar">
            <div className="m-top">
                <div className="wrap f-cb">
                    <h1 className="logo">
                        <Link to="/">网易云音乐</Link>
                    </h1>
                    <ul className="m-nav j-tflag">
                        {
                            navs.map((item, i) => {
                                return (
                                    <li className={formatClass(i, navs.length)} key={`nav-${i}`}>
                                        <span>
                                            <NavLink to={item.path} activeClassName="z-slt">
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
                        {
                            user.token ?
                            <Popover content={MyList}>
                                <div className="head f-fl f-pr">
                                    <img src={user.profile.avatarUrl} alt="" />
                                </div> 
                            </Popover>
                            :
                            <div className="link s-fc3" onClick={goLogin}>登录</div>
                        }
                    </div>
                    <a href="https://music.163.com/login?targetUrl=%2Fcreatorcenter" target="_blank" className="m-topvd f-pr m-creator-center">创作者中心</a>
                    <div className="m-srch f-pr j-suggest">
                        <div className="srchbg">
                            <span className="parent">
                            <input 
                                type="text" 
                                ref={searchRef} 
                                className="txt j-flag" 
                                onKeyPress={searchHandler}
                                placeholder="音乐/视频/电台/用户" 
                            />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`m-subnav j-tflag ${!showSubNav&&'m-subnav-up'}`}>
                <div className="wrap f-pr">
                    <ul className="nav">
                        {
                            subNav.map((item,i) => {
                                return (
                                    <li key={`sub-${i}`}>
                                        <Link to={'/home' + item.path} className={i===activeSub ? 'z-slt' : ''}>
                                            <em className={i===2 ? 'f-pr' :''}>
                                                {item.name}
                                                {
                                                    i===2 ? (
                                                        <span className="f-pa f-r-white-icon"></span>
                                                    ) : null
                                                }
                                            </em>
                                        </Link>
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

export default Header;