import Main from '@/components/Main';
import UserInfo from '@/components/Aside/UserInfo';
import friendApi from '@/api/friend';
import { EventWrap, EventItem } from './components/Event';

import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const Friend = () => {

    const [eventObj, setEvent] = useState({});
    const getEvents = useCallback(async () => {
        const res = await friendApi.getFriendEvent();
        setEvent({
            event: res.event,
            lasttime: res.lasttime,
            more: res.more
        })
    }, [])

    const userInfo = useSelector(state => state.user);
    const history = useHistory();
    useEffect(() => {
        if (Reflect.ownKeys(userInfo).length === 0) {
            message.warning('请先登录后查看朋友动态!')
            history.replace('/my/login');
            return;
        }
        getEvents();
    }, [])

    return (
        <Main className="g-bd1">
            <div className="g-mn1">
                <div className="g-mn1c">
                    <div className="g-wrap3">
                        <h1 className="m-timeline-title u-title f-cb">
                            动态
                        </h1>
                        <EventWrap>
                            {
                                eventObj?.event?.map(item => {
                                    return <EventItem info={item} key={item.id} />
                                })
                            }
                        </EventWrap>
                    </div>
                </div>
            </div>
            <div className="g-sd1">
                <div className="n-user-profile">
                    {
                        userInfo.token ?
                        <UserInfo /> :
                        null
                    }
                </div>
            </div>
        </Main>
    )
}

export default Friend;