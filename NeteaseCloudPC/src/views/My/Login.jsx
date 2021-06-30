import Main from '@/components/Main';
import loginFun from '@/utils/methods/login';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import userApi from '@api/user';

const Login = () => {

    const token = useSelector(state => state.user.token);
    const history = useHistory();

    useEffect(() => {
        userApi.getSubscribeMv().then(err => {
            console.log(err)
        })
        token && history.replace('/my/music');
    }, [])

    return (
        <Main>
            <div className="n-pglg">
                <div className="pic">
                    <h2>登录网易云音乐</h2>
                    <span className="btn" onClick={() => loginFun.openLogin(true)}></span>
                </div>
            </div>
        </Main>
    )
}

export default Login;