import Main from '@/components/Main';
import loginApi from '@/api/login';
import LoginForm, { LoginModal } from '@/components/Login/LoginForm';
import loginFun from '@/utils/methods/login';

import { Modal, message } from 'antd';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [isModalVisible, showModal] = useState(false);

    const onFinish = (values) => {
        login({phone:values.phone, password:values.password})
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const history = useHistory();

    const userInfo = useSelector(state => state.user);
    const setUserInfo = useDispatch();

    const login = ({phone, password}) => {
        loginApi.login(phone, password).then(res => {
            if (res.code !== 200) {
                message.error(res.message);
                return;
            }
            // 登录成功后写入store里面
            setUserInfo({type: 'setUserInfo', userInfo: res});
            showModal(false);
            history.replace('/my/main')
        })
    }

    const loginRef = useRef();

    return (
        <Main>
            <div className="n-pglg">
                <div className="pic">
                    <h2>登录网易云音乐</h2>
                    <span className="btn" onClick={() => loginRef.current.showModal(true)}></span>
                </div>
            </div>
            {/* 登录弹窗 */}
            <LoginModal 
                show={isModalVisible} 
                loginFns={{onFinishFailed, onFinish}} 
                ref={loginRef}
            />
        </Main>
    )
}

export default Login;