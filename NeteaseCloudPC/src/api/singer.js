import http from '@/api/http';

export default {
    async getHotSingers(limit=50, offset=0) { //热门歌手
        try {
            let res = await http.get(`/top/artists`, {
                limit,
                offset
            });
            return res.artists;
        } catch (err) {
            return err;
        }
    }
}