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
    },
    async getLyric(id) { //获取歌词
        try {
            const res = await http.get(`/lyric`, {
                id
            })
            return res.lrc.lyric
        } catch (err) {
            return err;
        }
    }
}