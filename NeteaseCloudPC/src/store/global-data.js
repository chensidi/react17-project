import { SET_CURSONG, SET_HISTORY, GET_SONGINFO, } from "./action-type";
import sessionStore from '@/utils/sessionStore';

const initialData = {
    curSong: null,
    keep: ['Home'],
    historyPlay: []
}

const globalReducer = (state = initialData, action) => {
    switch (action.type) {
        case SET_CURSONG:
            sessionStore.set('globalData', {
                ...state,
                curSong: action.song
            })
            return {
                ...state,
                curSong: action.song
            }
        case 'setKeep':
            let keeps = new Set(state.keep);
            keeps.add(action.name);
            /* sessionStore.set('globalData', {
                ...state,
                keep: [...keeps]
            }) */
            return {
                ...state,
                keep: [...keeps]
            }
        case SET_HISTORY:
            sessionStore.set('globalData', {
                ...state,
                historyPlay: action.history
            })
            return {
                ...state,
                historyPlay: action.history
            }
        case GET_SONGINFO:
            return state;
        default:
            return state;
    }
}

export default globalReducer;