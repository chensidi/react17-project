import { Button, Form, Input, Checkbox, Modal } from 'antd';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

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


export const LoginModal = forwardRef((props, ref) => {
    const {
        loginFns: {
            onFinishFailed,
            onFinish
        },
        title = '手机号登录',
        show = false,
    } = props;
    const [isModalVisible, showModal] = useState(show); //是否展示modal
    
    useEffect(() => {
        showModal(show);
    }, [show])

    useImperativeHandle(ref, () => {
        return {
            showModal
        }
    })

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

export const LoginModalCom = forwardRef((props, ref) => {
    const { title = '手机号登录' } = props;
    const [isModalVisible, showModal] = useState(false);
    const onFinishFailed = (err) => {
        console.log(err);
    }
    const onFinish = (values) => {
        console.log(values);
    }
    useImperativeHandle(ref, () => {
        return {
            show: showModal
        }
    })
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