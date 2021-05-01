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
    },
    async getAlbum(id, limit = 12, offset = 0) {  //歌手专辑
        try {
            let res = await http.get(`/artist/album`, {
                id,
                limit,
                offset,
            });
            return res.hotAlbums;
        } catch (err) {
            return err;
        }
    },
    async getMv(id, limit = 12, offset = 0) { //歌手mv
        try {
            let res = await http.get(`/artist/mv`, {
                id,
                limit,
                offset,
            });
            return res.mvs;
        } catch (err) {
            return err;
        }
    },
    async getSimi(id) { //相似歌手
        try {
            let res = await http.get(`/simi/artist`, {
                id,
            });
            return res.artists;
        } catch (err) {
            return err;
        }
    },
    async getCateList({
        type = -1,
        area = -1,
        initial = '',
        limit = 50,
        offset = 0
    }) { //歌手分类列表
        try {
            let res = await http.get(`/artist/list`, {
                type,
                area,
                initial,
                limit,
                offset
            });
            return res.artists;
        } catch (err) {
            return err;
        }
    },
    async topSinger(type = 1) { //歌手排行榜
        try {
            let res = await http.get(`/toplist/artist`, {
                type,
            });
            return res.list.artists;
        } catch (err) {
            return err;
        }
    },
}