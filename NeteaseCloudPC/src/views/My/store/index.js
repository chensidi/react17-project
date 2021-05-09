import sessionStore from '@/utils/sessionStore';

const initialState = sessionStore.get('userInfo') || {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setUserInfo':
            sessionStore.set('userInfo', action.userInfo);
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}

export default userReducer;