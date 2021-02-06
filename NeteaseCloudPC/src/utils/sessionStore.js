const sessionStore = {
    get(key) {
        try{
            let res = sessionStorage.getItem(key);
            if(res == null) {
                return {};
            }else {
                res = JSON.parse(res);
                return res;
            }
        }catch(e) {
            return {};
        }
    },
    set(key, val) {
        sessionStorage.setItem(key, JSON.stringify(val));
    },
    remove(key) {
        sessionStorage.removeItem(key);
    },
    clear() {
        sessionStorage.clear();
    }
}

export default sessionStore;