import http from '@/api/http';
import { message } from 'antd';

export default {
    async getAlbumInfo(id) { //获取专辑内容
        try {
            const res = await http.get(`/album`, {
                id,
            });
            return res;
        } catch (err) {
            return err;
        }
    },
}