class EventBus {
    
    listenObj = {}

    on(eventName, callback) {
        if (this.listenObj[eventName] === undefined) {
            this.listenObj[eventName] = [];
        }
        this.listenObj[eventName].push(callback);
    }

    emit(eventName, paramLists) {
        if (this.listenObj[eventName]) {
            this.listenObj[eventName].forEach(function(cb) {
                cb(paramLists);
            })
        }
    }

    off(eventName, callback) {
        if (this.listenObj[eventName]) {
            let idx = this.listenObj[eventName].findIndex(item => item === callback);
            this.listenObj[eventName].splice(idx, 1);
        }
    }

    once(eventName, callback) {
        const cb = (...arg) => {
            callback([...arg]);
            this.off(eventName, callback);
        }
        this.on(eventName, cb);
    }
}


export default new EventBus();


/* 
    eBus.on('xxx', (parmas) => {

    })

    eBus.emit('xxx', [1,2,3])
*/