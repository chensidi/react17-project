import { createRef, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useStore, useSelector } from 'react-redux';

import { Carousel } from 'antd';
import './index.scss';
import homeAction from './store/action';
import { homeApis } from '@/api/home';

const NewDiskSwiper = (props) => {
    const { newDisk } = props;
    const swp = createRef(null);
    function changeSwiper(flag) {
        flag ? swp.current.next() : swp.current.prev()
    }

    const [newDiskData, setNewDiskData] = useState([]);
    const store = useStore();
    const _getNewDisk = useCallback(async () => {
        let res = await homeApis.getNewDisk({limit: 10});
        res = [[...res.slice(0,5)], [...res.slice(5,)]];
        setNewDiskData(res);
        store.dispatch(homeAction.setNewDisk(res));
    }, [])

    const newDiskDataOfStore = useSelector(state => state.homeData.newDisk)
    function getNewDiskOfStore() {
        console.log(newDiskDataOfStore);
        if (newDiskDataOfStore.length) {
            setNewDiskData(newDiskDataOfStore);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (getNewDiskOfStore()) return;
        _getNewDisk();
    }, [])

    return (
        <div className="new-swiper">
            <span
                onClick={() => changeSwiper(false)}
                className="click-flag pre s-bg s-bg-7 f-tdn"
            ></span>
            <Carousel ref={swp} dots={false}>
                {newDiskData.map((item, i) => {
                    return (
                        <ul className="n-disk" key={`ul${i}`}>
                            {item.map((li) => {
                                return (
                                    <li key={li.id}>
                                        <div className="u-cover u-cover-alb1">
                                            <img src={li.picUrl} alt="" />
                                            <Link to={`/album/${li.id}`} className="msk"></Link>
                                            <a href="/#" title="播放" className="icon-play f-alpha f-fr"></a>
                                        </div>
                                        <p className="f-thide">
                                            <Link to={`/album/${li.id}`} className="s-fc0 tit">
                                                {li.name}
                                            </Link>
                                        </p>
                                        <p className="tit f-thide">
                                            <a href="/#" className="s-fc3">
                                                {li.artist.name}
                                            </a>
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    );
                })}
            </Carousel>
            <span
                onClick={() => changeSwiper(true)}
                className="click-flag nxt s-bg s-bg-8 f-tdn"
            ></span>
        </div>
    );
};


export default memo(NewDiskSwiper);