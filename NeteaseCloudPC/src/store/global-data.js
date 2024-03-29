import { SET_CURSONG, 
    SET_HISTORY, 
    SET_SHOWLRC, 
    SET_LOCK, 
    SET_LOADING, 
    SET_SUB_NAV,
    SET_SEARCH_TAB,
    SET_SEARCH_PAGE,
    SET_SHOW_PLAYBAR } from "./action-type";
import sessionStore from '@/utils/sessionStore';

let initialData = {
    curSong: sessionStore.get('globalData').curSong || null, //当前歌曲
    keep: ['Home'],
    historyPlay: sessionStore.get('globalData').historyPlay || [], //历史播放记录
    lock: sessionStore.get('globalData').lock ?? true, //是否锁定播放栏
    showPlaybar: sessionStore.get('globalData').showPlaybar ?? true, //是否展示播放条
    loading: false, //歌曲加载状态
    showSubNav: true, //是否展示二级导航条
    searchTab: '1', //搜素类型默认为1
    searchPage: 1, //搜素页数默认为1
    showLrc: sessionStore.get('globalData').showLrc ?? false, //展示歌词面板
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
            /* 
                此处踩坑😂,redux是对地址的比较  
                如果地址没变，即使值变了，UI也不会更新
            */
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
        case SET_SEARCH_TAB: 
            return {
                ...state,
                searchTab: action.tab
            }
        case SET_SEARCH_PAGE: 
            return {
                ...state,
                searchPage: action.page
            }
        case SET_SHOW_PLAYBAR:
            sessionStore.set('globalData', {
                ...state,
                showPlaybar: action.show
            })
            return {
                ...state,
                showPlaybar: action.show
            }
        case SET_SHOWLRC:
            sessionStore.set('globalData', {
                ...state,
                showLrc: action.show
            })
            return {
                ...state,
                showLrc: action.show
            }
        default:
            return state;
    }
}

export default globalReducer;
