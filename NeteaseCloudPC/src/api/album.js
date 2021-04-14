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
    async getPlayListInfo(id) { //获取歌单内容
        try {
            const res = await http.get(`/playlist/detail`, {
                id,
            });
            return {
                album: res.playlist,
                songs: res.playlist.tracks
            };
        } catch (err) {
            return err;
        }
    },
    async getPlayListCmt(id, limit = 20, offset = 0) { //获取歌单评论
        try {
            const res = await http.get(`/comment/playlist`, {
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