import { render, unmountComponentAtNode } from 'react-dom';

import { LoginModalCom } from '@/components/Login/LoginForm';
import { createRef } from 'react';
import store from '@/store';
import loginApi from '@/api/login';

function createModal() {
    if (instance) return;
    instance = document.createElement('div');
    render(<LoginModalCom ref={loginRef} />, instance);
    document.body.appendChild(instance);
}

let instance, 
    loginRef = createRef(); //实例

export default {
    openLogin(jump = true) {
        // 1.查看是否已经创建了login实例
        createModal();
        // 2.调用实例show方法
        loginRef.current.show(true);
        loginRef.current.setJump(jump);
    },
    killLogin() {
        instance && unmountComponentAtNode(instance);
        loginRef = null;
    },
    logout(jump) {
        loginApi.logout().then(res => {
            if (!res) return;
            store.dispatch({type: 'setUserInfo', userInfo: {}});
            jump && jump();
        })
    }
}