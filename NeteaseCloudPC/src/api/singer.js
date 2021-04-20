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
    },
    async getSongs(id, limit=21, offset=0, order='hot') { //歌手歌曲
        try {
            let res = await http.get(`/artist/songs`, {
                limit,
                offset,
                id,
                order
            });
            return res;
        } catch (err) {
            return err;
        }
    },
    async getDetails(id) { //歌手详情
        try {
            let res = await http.get(`/artist/detail`, {
                id,
            });
            return res.data;
        } catch (err) {
            return err;
        }
    },
    async getIntr(id) { //歌手介绍
        try {
            let res = await http.get(`/artist/desc`, {
                id,
            });
            return res;
        } catch (err) {
            return err;
        }
    }
}