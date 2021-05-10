import { useHistory, Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb } from 'antd';

import Main from '@/components/Main';
import { setSubNav } from '@store/action';
import { SongItem } from '@/views/Search/components';
import userApi from '@/api/user';

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
        let yaerOne = ~~(birthYaer / 10) * 10,
            yaerTwo = birthYaer % 10;
        yaerTwo = yaerTwo >= 5 ? 5 : 0;
        return yaerOne + yaerTwo;
    }

    const [recordList, setRecord] = useState([]);
    const [recordType, setType] = useState(1);
    const [level, setLevel] = useState(null);
    const getRecord = useCallback((type = 1) => { //播放记录
        setRecord([]);
        setType(type);
        userApi.getRecord(userInfo.profile.userId, type)
        .then(res => {
            setRecord(res.slice(0, 10));
        })
    }, [])

    const getLevel = useCallback(() => {
        userApi.getLevel().then(res => {
            console.log(res)
            setLevel(res);
        })
    }, [])

    useEffect(() => {
        dispatch(setSubNav(false));
        if (Reflect.ownKeys(userInfo).length === 0) {
            history.replace('/my/login');
            return;
        }
        setUser(getDisplayUserInfo());
        getRecord(1);
        getLevel();
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
                <div className="u-title u-title-1 f-cb m-record-title">
                    <h3>听歌排行</h3>
                    <h4>累积听歌{ level?.nowPlayCount }首</h4>
                    <div style={{textAlign: 'right'}}>
                        <Breadcrumb separator="|" >
                            <Breadcrumb.Item 
                                className={`listen-time ${recordType===1?'active-type':''}`}
                                onClick={() => getRecord(1)}
                            >最近一周
                            </Breadcrumb.Item>
                            <Breadcrumb.Item 
                            className={`listen-time ${recordType===0?'active-type':''}`}
                            onClick={() => getRecord(0)}
                            >所有时间
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="n-srchrst">
                    <div className="srchsongst small-tb record-list">
                        {
                            recordList.map(item => {
                                return <SongItem key={item.song.id} {...item.song} />
                            })
                        }
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default MainPage;