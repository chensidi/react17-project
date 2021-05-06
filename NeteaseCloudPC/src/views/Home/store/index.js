const initailState = {
    banners: [],
    recommends: [],
    newDisk: [],
    ranks: [],
    hotSingers: [],
    hotDjs: []
}

const homeReducer = (state = initailState, action) => {
    switch (action.type) {
        case 'setBanners':
            return {
                ...state,
                banners: action.banners
            }
        case 'setRecommends':
            return {
                ...state,
                recommends: action.recommends
            }
        case 'setNewDisk':
            return {
                ...state,
                newDisk: action.newDisk
            }
        case 'setRanks':
            return {
                ...state,
                ranks: action.ranks
            }
        case 'setHotSingers':
            return {
                ...state,
                hotSingers: action.hotSingers
            }
        case 'setHotDjs':
            return {
                ...state,
                hotDjs: action.hotDjs
            }
        default:
            return state;
    }
}

export default homeReducer;