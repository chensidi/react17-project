export default {
    setBanners(banners) {
        return {
            type: 'setBanners',
            banners,
        }
    },
    setRecommends(recommends) {
        return {
            type: 'setRecommends',
            recommends
        }
    },
    setNewDisk(newDisk) {
        return {
            type: 'setNewDisk',
            newDisk
        }
    },
    setRanks(ranks) {
        return {
            type: 'setRanks',
            ranks
        }
    },
    setHotSingers(hotSingers) {
        return {
            type: 'setHotSingers',
            hotSingers
        }
    },
    setHotDjs(hotDjs) {
        return {
            type: 'setHotDjs',
            hotDjs
        }
    }
}