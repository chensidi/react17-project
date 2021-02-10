import http from '@/api/http';

export const homeApis = {
    async getBanners() { //首页广告
        try {
            const res = await http.get(`/banner`);
            return res.banners;
        } catch (err) {
            return err;
        }
    },

    async getRecommend(params) { //热门推荐
        const {limit=10, order="hot"} = params
        try {
            const res = await http.get(`/top/playlist`, {
                limit,
                order
            })
            return res.playlists;
        } catch (err) {
            return err;
        }
    },

    async getNewDisk(params) { //新碟上架
        const { //新碟上架
            limit = 50,
            offset = 0,
            area = 'ALL', //ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
        } = params;
        try {
            const res = await http.get(`/album/new`, {
                limit,
                offset,
                area,
            })
            return res.albums;
        } catch (err) {
            return err;
        }
    },

    async getTopList() { //所有榜单
        try {
            const res = await http.get(`/toplist`)
            return res.list;
        } catch (err) {
            return err;
        }
    },

    async getRank(id) { //榜单
        try {
            const res = await http.get(`/playlist/detail`, {id})
            return res.playlist;
        } catch (err) {
            return err;
        }
    }
}
