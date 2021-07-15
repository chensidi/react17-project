import http from '@/api/http';
import { message } from 'antd';

export default {
    async login(phone, password) { //登录
        try {
            const res = await http.get('/login/cellphone', {
                phone,
                password
            })
            if (res.code !== 200) { //未登录成功
                message.error(res.message);
                return false;
            }
            message.success(`登录成功！欢迎${res.profile.nickname}来到Jacky网易music`);
            return res;
        } catch (err) {
            console.log(err)
            const { msg = '账号错误或不存在' } = err;
            message.error(msg);
            return {
                error: true
            };
        }
    },
    async logout() { //登出
        try {
            const res = await http.get('/logout');
            if (res.code === 200) {
                message.success('已安全退出');
                return true;
            } else {
                message.warning('退出失败，请重试！');
                return false;
            }
        } catch (e) {
            message.warning('退出失败，请重试！');
            return false;
        }
    }
}