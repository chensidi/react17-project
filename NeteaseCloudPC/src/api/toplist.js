import http from '@/api/http';

export default {
    async getTopLists() {
        try {
            let res = await http.get(`/toplist`);
            return res.list;
        } catch (err) {
            return err;
        }
    }
}