import Main from '@/components/Main';
import loginFun from '@/utils/methods/login';

const Login = () => {

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