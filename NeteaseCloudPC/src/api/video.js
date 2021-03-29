import http from '@/api/http';

export default {
    async getVideoInfo(id) { //获取视频信息
        try {
            const res = await http.get(`/video/detail`, {
                id,
            });
            return res.data;
        } catch (err) {
            return err;
        }
    },
    async getVideoUrl(id) { //获取视频地址
        try {
            const res = await http.get(`/video/url`, {
                id,
            });
            return res.urls;
        } catch (err) {
            return err;
        }
    },
}