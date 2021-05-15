import { Button, Form, Input, Checkbox, Modal, message } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';

import loginApi from '@/api/login';
import store from '@/store';
import { routerRef } from '@/router/generateRoute'


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

export const LoginModalCom = forwardRef((props, ref) => {
    const { title = '手机号登录' } = props;
    const [isModalVisible, showModal] = useState(false);
    const onFinishFailed = (err) => {
        console.log(err);
    }
    const onFinish = (values) => {
        login({phone:values.phone, password:values.password})
    }
    useImperativeHandle(ref, () => {
        return {
            show: showModal,
            setJump
        }
    })
    const [needJump, setJump] = useState(true)
    const login = ({phone, password}) => {
        loginApi.login(phone, password).then(res => {
            if (res.code !== 200) {
                message.error(res.message);
                return;
            }
            // 登录成功后写入store里面
            store.dispatch({type: 'setUserInfo', userInfo: res})
            showModal(false);
            // 根据条件判断是否进行跳转
            needJump && routerRef.current.history.replace('/my/main');
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