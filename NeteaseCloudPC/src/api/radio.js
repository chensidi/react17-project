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
    async getRecommendByType(type) { //电台分类推荐
        try {
            const res = await http.get('/dj/recommend/type', {type})
            return res.djRadios ?? [];
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    async getHotByType({limit = 30, offset = 0, cateId} = {}) { //电台-类别热门电台
        try {
            const res = await http.get('/dj/radio/hot', {limit, offset, cateId})
            return res;
        } catch (err) {
            console.log(err);
            return {};
        }
    },
    async getDetails(rid) { //电台详情
        try {
            const res = await http.get('/dj/detail', {rid})
            return res.data;
        } catch (err) {
            console.log(err);
            return {};
        }
    },
    async getProgram(rid, {limit=30, offset=0, asc=false} = {}) { //电台节目详情
        try {
            const res = await http.get('/dj/program', {
                rid,
                limit,
                offset,
                asc
            })
            return res;
        } catch (err) {
            console.log(err);
            return {};
        }
    },
    
}