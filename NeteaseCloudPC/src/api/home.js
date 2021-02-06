import http from '@/api/http';

export const homeApis = {
    async getBanners() {
        try {
            const res = await http.get('/banner');
            return res.banners;
        } catch (err) {
            return err;
        }
    }
}