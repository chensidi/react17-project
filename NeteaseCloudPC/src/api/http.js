import axios from 'axios';

import store from '@/store';
import { historyAlpha } from '@/App';
import localStore from '@/utils/localStore';
import loginFn from '@/utils/methods/login';

const isDev = process.env.NODE_ENV === 'development';

class Http {
    instance = null;
    constructor() {
        this.init();
    }
    init() {
        // 创建 axios 实例
        this.instance = axios.create({
            baseURL: isDev ? '/api' : 'http://zhoup.top:7003/',
            timeout: 10000, // 请求超时时间
        })
        this.instance.defaults.withCredentials = true;
        // 拦截器配置---------------------------------------------------------------------------------------------------------------
        this.instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config
        }, function (error) {
            return Promise.reject(error)
        })
        this.instance.interceptors.response.use(function (res) {
            const { data: {code} } = res;
            // do something
            if (code === 200) {
                return res.data;
            } else {
                return Promise.reject(res.data);
            }
        }, function (error) {
            console.log(error.response);
            const { data: {code, msg} } = error.response
            switch (code) {
                case 301: //未登录或登录token失效
                    notLoginHandler();
                    return Promise.reject(msg);
                case 400:
                    return Promise.reject(false)
                default:
                    return '系统异常'
            }
        })
    }
    get(url, params = {}) {
        return this.instance.get(url, {
            params
        })
    }
    post(url, data = {}) {
        return this.instance.post(url, {
            data
        })
    }
}

function notLoginHandler() { //未登录或登录失效
    const userInfo = store.getState().user;
    const localUser = localStore.get('user');
    const {phone, password, remember} = localUser;
    //未登录
    if (userInfo?.token == undefined) { //没有token记录，则退回首页
        historyAlpha.history.replace('/')
    } else { //token存在，但已过期
        loginFn.logout(historyAlpha.history.replace('/'));
        //记住密码情况
        if (remember) {
            loginFn.login({phone, password})
        }
    }
}

export default new Http();