import { createRef, } from 'react';
import { Carousel } from 'antd';
import './index.scss';

const NewDiskSwiper = (props) => {
    const { newDisk } = props;
    const swp = createRef(null);
    function changeSwiper(flag) {
        flag ? swp.current.next() : swp.current.prev()
    }
    return (
        <div className="new-swiper">
            <span
                onClick={() => changeSwiper(false)}
                className="click-flag pre s-bg s-bg-7 f-tdn"
            ></span>
            <Carousel ref={swp} dots={false}>
                {newDisk.map((item, i) => {
                    return (
                        <ul className="n-disk" key={`ul${i}`}>
                            {item.map((li) => {
                                return (
                                    <li key={li.id}>
                                        <div className="u-cover u-cover-alb1">
                                            <img src={li.picUrl} alt="" />
                                            <a href="/#" className="msk"></a>
                                            <a href="/#" title="播放" className="icon-play f-alpha f-fr"></a>
                                        </div>
                                        <p className="f-thide">
                                            <a href="/#" className="s-fc0 tit">
                                                {li.name}
                                            </a>
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


export default NewDiskSwiper;