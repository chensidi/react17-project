import { SET_CURSONG } from "./action-type";

const initialData = {
    curSong: {
        url: 'xxx',
        name: 'yyy',
        singer: 'zzz'
    },
}

const globalReducer = (state = initialData, action) => {
    switch (action.type) {
        case SET_CURSONG:
            return {
                ...state,
                curSong: action.song
            }
        default:
            return state;
    }
}

export default globalReducer;