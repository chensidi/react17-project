import { Button, Form, Input, Checkbox, Modal, message } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';

import loginApi from '@/api/login';
import store from '@/store';
import { routerRef } from '@/router/generateRoute';
import localStore from '@/utils/localStore';
import { aesEncrypt } from '@/utils/pureFunctions';
import { historyAlpha } from '@/App'


const isDev = process.env.NODE_ENV === 'development';

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
                label="手机号码"
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
                label="密码"
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
                <Checkbox>自动登录</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}

export const LoginModalCom = forwardRef((props, ref) => {
    console.log(historyAlpha);

    const { title = '手机号登录' } = props;
    const [isModalVisible, showModal] = useState(false);
    const onFinishFailed = (err) => {
        console.log(err);
    }
    const onFinish = (values) => {
        login({
            phone:values.phone, 
            password:values.password,
            remember: values.remember
        })
    }
    useImperativeHandle(ref, () => {
        return {
            show: showModal,
            setJump
        }
    })
    const [needJump, setJump] = useState(true)
    const login = ({phone, password, remember}) => {
        if (!isDev) {
            phone = aesEncrypt(phone);
            password = aesEncrypt(password);
        }
        loginApi.login(phone, password).then(res => {
            if (!res) return;
            // 登录成功后写入store里面
            store.dispatch({type: 'setUserInfo', userInfo: res});
            if (remember) { //自动登录
                localStore.set('user', {
                    phone,
                    password,
                    remember
                })
            }
            showModal(false);
            // 根据条件判断是否进行跳转
            needJump && historyAlpha.history.replace('/my/music');
        })
    }
    return (
        <Modal
            title={title} 
            visible={isModalVisible}
            onCancel={() => showModal(false)}
            footer={null}
        >
            <LoginForm onFinishFailed={onFinishFailed} onFinish={onFinish}  />
        </Modal>
    )
})

export default LoginForm;