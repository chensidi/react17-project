import http from '@/api/http';

export default {
    async getVideoInfo(id) { //获取视频信息
        try {
            let res = await http.get(`/video/detail`, {
                id,
            });
            return res.data;
        } catch (err) {
            let res = await http.get(`/mv/detail`, {
                mvid: id
            })
            return res.data;
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
    async getMVUrl(id) { //获取MV地址
        try {
            const res = await http.get(`/mv/url`, {
                id,
            });
            return [{url: res.data.url}];
        } catch (err) {
            return err;
        }
    },
}