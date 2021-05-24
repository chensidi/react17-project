import sessionStore from '@/utils/sessionStore';
import localStore from '@/utils/localStore';

const initialState = sessionStore.get('userInfo') || {};

/* 
    login之后，看是否需要自动登录
    需要，则在localStore里存入phone，pwd
*/

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setUserInfo':
            sessionStore.set('userInfo', action.userInfo);
            return {
                ...action.userInfo
            }
        default:
            return state;
    }
}

export default userReducer;