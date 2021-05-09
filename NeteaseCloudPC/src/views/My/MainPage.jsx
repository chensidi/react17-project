import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Main from '@/components/Main';
import { setSubNav } from '@store/action';

const MainPage = () => {

    const userInfo = useSelector(state => state.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    const getDisplayUserInfo = () => {
        return {
            avatar: userInfo.profile.avatarUrl,
            nickname: userInfo.profile.nickname,
            sex: userInfo.profile.gender,
            active: userInfo.profile.eventCount,
            focus: userInfo.profile.follows,
            followeds: userInfo.profile.followeds,
            signature: userInfo.profile.signature,
            birthday: userInfo.profile.birthday
        }
    }

    const ages = (birthday) => {
        const birthYaer = new Date(birthday).getFullYear() % 100;
        console.log(birthYaer)
        let yaerOne = ~~(birthYaer / 10) * 10,
            yaerTwo = birthYaer % 10;
        yaerTwo = yaerTwo >= 5 ? 5 : 0;
        return yaerOne + yaerTwo;
    }

    useEffect(() => {
        dispatch(setSubNav(false));
        if (Reflect.ownKeys(userInfo).length === 0) {
            history.replace('/my/login');
            return;
        }
        setUser(getDisplayUserInfo());
    }, [])

    return (
        <Main>
            <div className="g-wrap p-prf">
                <div className="m-proifo f-cb">
                    <div className="f-pr dt">
                        <img src={user?.avatar} alt="" className="" />
                    </div>
                    <div className="info-div">
                        <div className="name f-cb">
                            <div className="f-cb">
                                <div className="edit">
                                    <span className="u-btn2 u-btn2-1">
                                        <i>编辑个人资料</i>
                                    </span>
                                </div>
                                <h2 className="wrap f-fl f-cb">
                                    <span className="tit f-ff2 s-fc0 f-thide">{ user?.nickname }</span>
                                    <span className="lev u-lev u-icn2 u-icn2-lev">7
                                        <i className="right u-icn2 u-icn2-levr"></i>
                                    </span>
                                    <i className={`icn u-icn u-icn-0${user?.sex}`}></i>
                                </h2>
                            </div>
                        </div>
                        <ul className="data s-fc3 f-cb">
                            <li className="fst">
                                <Link to="">
                                    <strong>{ user?.active }</strong>
                                    <span>动态</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <strong>{ user?.focus }</strong>
                                    <span>关注</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <strong>{ user?.followeds }</strong>
                                    <span>粉丝</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="inf s-fc3 f-brk">
                        个人介绍：{ user?.signature }
                        </div>
                        <div className="inf s-fc3">
                            <span>所在地区：四川省 - 成都市</span>
                            <span className="sep"> 年龄：<span>{ages(user?.birthday)}后</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default MainPage;