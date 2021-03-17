import { SET_CURSONG, 
    SET_HISTORY, 
    GET_SONGINFO, 
    SET_LOCK, 
    SET_LOADING, 
    SET_SUB_NAV,} from "./action-type";
import sessionStore from '@/utils/sessionStore';

let initialData = {
    curSong: sessionStore.get('globalData').curSong || null,
    keep: ['Home'],
    historyPlay: sessionStore.get('globalData').historyPlay || [],
    lock: sessionStore.get('globalData').lock || false,
    loading: false,
    showSubNav: true,
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
        case SET_LOCK:
            sessionStore.set('globalData', {
                ...state,
                lock: action.lock
            })
            return {
                ...state,
                lock: action.lock
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_SUB_NAV:
            return {
                ...state,
                showSubNav: action.show
            }
        default:
            return state;
    }
}

export default globalReducer;
