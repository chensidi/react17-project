import http from "./http";

export default {
    async getCateLists() { //电台分类列表
        try {
            const res = await http.get('/dj/catelist')
            return res.categories ?? [];
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    async getRecommend(limit=10) { //电台推荐
        try {
            const res = await http.get('/dj/recommend', {limit})
            return res.djRadios ?? [];
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    async getToplists(limit=10) { //电台节目榜
        try {
            const res = await http.get('/dj/program/toplist', {limit})
            return res.toplist ?? [];
        } catch (err) {
            console.log(err);
            return [];
        }
    },
}