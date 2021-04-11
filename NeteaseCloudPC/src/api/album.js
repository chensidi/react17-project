import http from '@/api/http';

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
    async getAlbumCmt(id, limit = 20, offset = 0) { //获取专辑评论
        try {
            const res = await http.get(`/comment/album`, {
                id,
                limit,
                offset
            });
            return res;
        } catch (err) {
            return err;
        }
    },
}