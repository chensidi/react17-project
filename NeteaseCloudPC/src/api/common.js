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
    async getLyric(id) { //获取歌词
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
}