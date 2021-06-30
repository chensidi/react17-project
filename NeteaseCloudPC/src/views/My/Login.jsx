import Main from '@/components/Main';
import loginFun from '@/utils/methods/login';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Login = () => {

    const token = useSelector(state => state.user.token);
    const history = useHistory();

    useEffect(() => {
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