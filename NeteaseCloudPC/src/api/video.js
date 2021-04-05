import http from '@/api/http';

export default {
    async getVideoInfo(id) { //获取视频信息
        try {
            let res = await http.get(`/video/detail`, {
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
    async getMVInfo(id) { //mv信息
        try {
            const res = await http.get(`/mv/detail`, {
                mvid: id
            })
            return res.data;
        } catch (err) {
            return err;
        }
    },
    async getMVUrl(id, r=1080) { //获取MV地址
        try {
            const res = await http.get(`/mv/url`, {
                id,
                r
            });
            return [{url: res.data.url, r: res.data.r}];
        } catch (err) {
            return err;
        }
    },
}