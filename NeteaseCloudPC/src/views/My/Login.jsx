import Main from '@/components/Main';
import loginApi from '@/api/login';

import { Modal, Button, Form, Input, Checkbox, message } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
};

const LoginForm = ({onFinish, onFinishFailed}) => {
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                {
                    required: true,
                    message: 'Please input your phone!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

const Login = () => {
    const [isModalVisible, showModal] = useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
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
            console.log(res);
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

    return (
        <Main>
            <div className="n-pglg">
                <div className="pic">
                    <h2>登录网易云音乐</h2>
                    <span className="btn" onClick={() => showModal(true)}></span>
                </div>
            </div>
            {/* 登录弹窗 */}
            <Modal 
                title="手机号登录" 
                visible={isModalVisible}
                onCancel={() => showModal(false)}
                footer={null}
            >
               <LoginForm onFinishFailed={onFinishFailed} onFinish={onFinish} />
            </Modal>
        </Main>
    )
}

export default Login;