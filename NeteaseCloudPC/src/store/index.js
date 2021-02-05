import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from './global-data';
import userReducer from './user';

const reducers = combineReducers({
    globalData: globalReducer,
    user: userReducer,
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;