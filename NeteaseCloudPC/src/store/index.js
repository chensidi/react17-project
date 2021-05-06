import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from './global-data';
import userReducer from './user';
import homeReducer from '@/views/Home/store';

const reducers = combineReducers({
    globalData: globalReducer,
    user: userReducer,
    homeData: homeReducer
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;