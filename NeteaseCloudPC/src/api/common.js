import http from '@/api/http';

export default {
    async getSongUrl(id) { //获取音乐url
        try {
            const res = await http.get(`/song/url`, {
                id
            });
            return res.data[0].url;
        } catch (err) {
            return err;
        }
    }
}