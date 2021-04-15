import http from '@/api/http';

export default {
    async getHotDjs(limit = 20) { //最热主播
        try {
            let res = await http.get(`/dj/toplist/popular`, {
                limit,
            });
            return res.data;
        } catch (err) {
            return err;
        }
    }
}