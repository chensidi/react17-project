import { SET_CURSONG, 
    SET_USERINFO, 
    SET_HISTORY, 
    SET_LOCK, 
    SET_LOADING,
    SET_SUB_NAV,
    SET_SEARCH_TAB,
    SET_SEARCH_PAGE } from "./action-type";
import commonRequest from '@/api/common';
import { mediaTimeFormat, artistsFormat } from '@/utils/utils';

async function getSongById(defaultId) { //根据id获取歌曲信息
    const id = defaultId;
    const url = await commonRequest.getSongUrl(id);
    const lyc = await commonRequest.getLyric(id);
    const details = await commonRequest.getSongDetails(id);
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

export const setLoadingPlaybar = (loading) => {
    return {
        type: SET_LOADING,
        loading, 
    }
}

export const getSongInfo = (id) => {
    return (dispatch) => {
        dispatch(setLoadingPlaybar(true));
        return getSongById(id).then(res => {
            const { lyc, url, details } = res;
            dispatch(setLoadingPlaybar(false));
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

export const setSubNav = (show) => {
    return {
        type: SET_SUB_NAV,
        show
    }
}

export const setSearchTab = (tab) => {
    return {
        type: SET_SEARCH_TAB,
        tab
    }
}

export const setSearchPage = (page) => {
    return {
        type: SET_SEARCH_PAGE,
        page
    }
}

