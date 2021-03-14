import { SET_CURSONG, SET_USERINFO, SET_HISTORY, GET_SONGINFO, SET_LOCK } from "./action-type";
import commonRequest from '@/api/common';
import { mediaTimeFormat, artistsFormat } from '@/utils/utils';
import { message } from 'antd';

async function getSongById(defaultId) { //根据id获取歌曲信息
    const id = defaultId;
    const url = await commonRequest.getSongUrl(id);
    const lyc = await commonRequest.getLyric(id);
    const details = await commonRequest.getSongDetails(id);
    /* props.setCurSong({
        url,
        name: details.name,
        singer: artistsFormat(details.ar),
        lyc: res,
        id,
        alblum: details.al,
        duration: mediaTimeFormat(details.dt)
    }) */
    return { id, details, lyc, url };
}

export const setCurSong = (song) => {
    return {
        type: SET_CURSONG,
        song,
    }
}

export const setHistory = (history) => {
    return {
        type: SET_HISTORY,
        history,
    }
}

export const setUserInfo = (userInfo) => {
    return {
        type: SET_USERINFO,
        userInfo
    }
}

export const getSongInfo = (id) => {
    return (dispatch) => {
        message.loading({ 
            content: '歌曲加载中...', 
            key: 'loading', 
            duration: 0 ,
            style: {
                marginTop: '40vh',
            },
        });
        return getSongById(id).then(res => {
            const { lyc, url, details } = res;
            message.destroy('loading');
            return dispatch(setCurSong({
                url,
                name: details.name,
                singer: artistsFormat(details.ar),
                lyc: lyc,
                id,
                alblum: details.al,
                duration: mediaTimeFormat(details.dt / 1000)
            }))
        })
    }
}

export const setLock = (lock) => {
    return {
        type: SET_LOCK,
        lock
    }
}