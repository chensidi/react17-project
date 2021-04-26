import http from '@/api/http';

export default {
    async getTopLists() {
        try {
            let res = await http.get(`/toplist`);
            return res.list;
        } catch (err) {
            return err;
        }
    },
    async getTopDetails(id) {
        try {
            let res = await http.get(`/playlist/detail`, {id});
            return res.playlist;
        } catch (err) {
            return err;
        }
    }
}