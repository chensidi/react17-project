import http from '@/api/http';

export default {
    async getRecord(uid, type) {
        try {
            const res = await http.get('/user/record', {
                uid,
                type
            })
            return res.allData || res.weekData;
        } catch (e) {
            return e;
        }
    },
    async getLevel() {
        try {
            const res = await http.get('/user/level')
            return res.data;
        } catch (e) {
            return e;
        }
    },
    async getPlayList(uid) {
        try {
            const res = await http.get('/user/playlist', {
                uid
            })
            return res.playlist;
        } catch (e) {
            return e;
        }
    },
    async getSubscribe(uid) {
        try {
            const res = await http.get('/user/follows', {uid})
            return res.playlist;
        } catch (e) {
            return e;
        }
    },
    async getSubscribeSinger(uid) {
        try {
            const res = await http.get('/artist/sublist', {uid})
            return res.data;
        } catch (e) {
            return e;
        }
    },
    async getSubscribeMv() {
        try {
            const res = await http.get('/mv/sublist');
            return res.data;
        } catch (e) {
            return e;
        }
    },
}