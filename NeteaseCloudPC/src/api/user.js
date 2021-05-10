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
    
}