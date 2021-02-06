import { Carousel } from 'antd';
import { useState } from 'react';
import './index.scss';

const Banner = (props) => {
    const [bannerIdx, setIdx] = useState(0);
    function onChange(from, to) {
        setIdx(to);
    }
    const banners = props.banners;
    return (
        <section className="banners" style={{'backgroundImage': `url(${banners[bannerIdx]&&banners[bannerIdx].imageUrl}?imageView&blur=40x20)`}}>
            <div className="banner-wrap">
                <Carousel 
                    beforeChange={onChange}
                    autoplay
                >
                    {
                        banners.map(item => (
                            <div key={item.encodeId}>
                                <img className="banner-item" src={item.imageUrl} alt="" />
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </section>
    )
}

export default Banner;