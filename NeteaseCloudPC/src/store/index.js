import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from './global-data';
import userReducer from '@/views/My/store';
import homeReducer from '@/views/Home/store';
import radioReducer from '@/views/Radio/store';

const reducers = combineReducers({
    globalData: globalReducer,
    user: userReducer,
    homeData: homeReducer,
    radioData: radioReducer
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;