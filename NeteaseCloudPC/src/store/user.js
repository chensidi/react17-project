import { SET_USERINFO } from "./action-type";

const initialData = {
    userInfo: {
        name: 'Jacky',
        age: 25,
        city: 'ChengDu'
    }
}

const userReducer = (state = initialData, action) => {
    switch (action.type) {
        case SET_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}

export default userReducer;