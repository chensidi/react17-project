import http from '@/api/http';

export default {
    async login(phone, password) {
        try {
            const res = await http.get('/login/cellphone', {
                phone,
                password
            })
            return res;
        } catch (e) {
            return {
                message: '账号不存在'
            };
        }
    }
}