import http from '@/api/http';

export default {
    async getNewDisk({
        limit = 10,
        offset = 0,
        area = 'ALL',
        type = 'hot',
        year = new Date().getFullYear()
    } = {}) { //新碟上架
        try {
            const res = await http.get(`/top/album`, {
                limit,
                offset,
                area,
                type,
                year
            });
            return res.weekData.slice(0, limit);
        } catch (err) {
            return err;
        }
    },
    async getNewDiskByCate({
        limit = 35,
        offset = 0,
        area = 'ALL',
    } = {}) { //新碟上架
        try {
            const res = await http.get(`/album/new`, {
                limit,
                offset,
                area,
            });
            return res;
        } catch (err) {
            return err;
        }
    },
}