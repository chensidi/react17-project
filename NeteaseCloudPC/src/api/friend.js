import http from '@/api/http';

export default {
    async getFriendEvent(pagesize = 20, lasttime = -1) { //朋友动态
        try {
            let res = await http.get(`/event`, {
                pagesize,
                lasttime
            });
            return res;
        } catch (err) {
            return err;
        }
    }
}