import http from '@/api/http';
import { message } from 'antd';

export default {
    async getSongUrl(id) { //获取音乐url
        try {
            const res = await http.get(`/song/url`, {
                id,
                random: Date.now()
            });
            return res.data[0].url;
        } catch (err) {
            return err;
        }
    },
    async getLyric(id, key = false) { //获取歌词
        try {
            message.loading({ 
                content: '获取歌词中...', 
                key: 'loadlrc', 
                duration: 0 ,
                style: {
                    marginTop: '40vh',
                },
            });
            const res = await http.get(`/lyric`, {
                id
            })
            if (key) {
                return res;
            }
            return res.lrc.lyric
        } catch (err) {
            return err;
        } finally {
            message.destroy('loadlrc');
        }
    },
    async getSongDetails(ids) { //获取歌曲详情
        try {
            const res = await http.get(`/song/detail`, {
                ids
            })
            return res.songs[0]
        } catch (err) {
            return err;
        }
    },
    async getCmtOfSong({id, limit = 20, offset = 0} = {}) { //获取歌曲评论
        try {
            const res = await http.get(`/comment/music`, {
                id,
                limit,
                offset
            })
            return res;
        } catch (err) {
            return err;
        }
    },
    async getSameList(id) { //获取相似歌单
        try {
            const res = await http.get(`/simi/playlist`, {
                id,
            })
            return res.playlists;
        } catch (err) {
            return err;
        }
    },
    async getSameSong(id) { //获取相似歌曲
        try {
            const res = await http.get(`/simi/song`, {
                id,
            })
            return res.songs;
        } catch (err) {
            return err;
        }
    }
}