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
    },
    async getCmts(id, limit=20, offset=0) {
        try {
            let res = await http.get(`/comment/playlist`, {id, limit, offset});
            return res;
        } catch (err) {
            return err;
        }
    },
    async getCatlist() {
        try {
            let res = await http.get(`/playlist/catlist`);
            return res;
        } catch (err) {
            return err;
        }
    },
    async getCateLists(params = {}) {
        const {limit=35, order="hot", offset=0, cat="全部"} = params
        try {
            const res = await http.get(`/top/playlist`, {
                limit,
                order,
                offset,
                cat
            })
            return res;
        } catch (err) {
            return err;
        }
    },
}