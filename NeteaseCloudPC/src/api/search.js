import http from '@/api/http';

export const searchApi = {
    async searchByKw(keywords, type, limit=30, offset=0) {
        try {
            const res = await http.get(`/cloudsearch`, {
                type,
                limit,
                offset,
                keywords
            });
            return res.result;
        } catch (err) {
            return err;
        }
    }
}