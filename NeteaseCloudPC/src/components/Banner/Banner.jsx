import { Carousel } from 'antd';
import { useState, memo, useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';

import './index.scss';
import { homeApis } from '@/api/home';
import homeAction from '@/views/Home/store/action';

const Banner = (props) => {
    const [bannerIdx, setIdx] = useState(0);
    function onChange(from, to) {
        setIdx(to);
    }
    const store = useStore();
    const bannersOfStore = useSelector(state => state.homeData.banners)

    const [bannersData, setBannersData] = useState([]);
    const _loadBanners = useCallback(async () => { //轮播图
        const res = await homeApis.getBanners();
        setBannersData(res);
        store.dispatch(homeAction.setBanners(res));
    }, [])

    function getStoreBanner() { //获取store里面的banner
        if (bannersOfStore.length) {
            setBannersData(bannersOfStore);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        /* 
            1. 先去store里面拿banner数据
            2. 若发现store里的banner为空则发请求获取
            3. 然后存入store
        */
        if (getStoreBanner()) return;
        _loadBanners();
    }, [])

    return (
        <section className="banners" style={{'backgroundImage': `url(${bannersData[bannerIdx]&&bannersData[bannerIdx].imageUrl}?imageView&blur=40x20)`}}>
            <div className="banner-wrap">
                <Carousel 
                    beforeChange={onChange}
                    autoplay
                >
                    {
                        bannersData.map(item => (
                            <div key={item.encodeId}>
                                <img className="banner-item" src={item.imageUrl + '?imageView&quality=89'} alt="" />
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </section>
    )
}

export default memo(Banner);