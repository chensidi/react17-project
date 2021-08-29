import initialState from './initialState';
import sessionStore from '@/utils/sessionStore';

const radioReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setCates':
            sessionStore.set('radioCates', action.cates)
            return {
                ...state,
                cates: action.cates
            }
        default:
            return {...state}
    }
}

export default radioReducer;