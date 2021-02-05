import { SET_CURSONG, SET_USERINFO } from "./action-type";

export const setCurSong = (song) => {
    return {
        type: SET_CURSONG,
        song,
    }
}

export const setUserInfo = (userInfo) => {
    return {
        type: SET_USERINFO,
        userInfo
    }
}