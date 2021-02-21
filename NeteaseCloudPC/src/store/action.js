import { SET_CURSONG, SET_USERINFO, SET_HISTORY } from "./action-type";

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