import http from '@/api/http';

export const homeApis = {
    async getBanners() {
        try {
            const res = await http.get(`/banner`);
            return res.banners;
        } catch (err) {
            return err;
        }
    },

    async getRecommend({limit=10, order="hot"} = params) {
        try {
            const res = await http.get(`/top/playlist`, {
                limit,
                order
            })
            return res.playlists;
        } catch {
            return err;
        }
    }
}
