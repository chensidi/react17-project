import NavTitle from '@/components/Common/NavTitle';
import radioApi from '@api/radio';

import { useEffect, useState } from 'react'; 
import { Progress } from 'antd';

const RecommendItem = ({
    picUrl,
    name,
    dj: {nickname},
    category,
    idx,
    rcmdtext
}) => {
    return (
        <li className={`itm ${idx % 2 && 'bg'}`}>
            <img className="f-fl" src={`${picUrl}?param=40x40`} alt="" />
            <div className="cnt f-fl">
                <h4 className="f-thide">{ name }</h4>
                <p className="f-thide">{ rcmdtext ?? nickname }</p>
            </div>
            <span className="tag">{ category }</span>
        </li>
    )
}

function getPercent(val, total) {
    return val / total * 100;
}

const TopItem = ({
    program: {
        coverUrl,
        name,
        dj: {
            brand
        }
    },
    rank,
    totalScore,
    score,
    idx
}) => {
    return (
        <li className={`itm ${idx % 2 && 'bg'}`}>
            <div className="rank s-fc4 f-fl">
                <em>{rank}</em>
                <i>NEW</i>
            </div>
            <img className="f-fl" src={`${coverUrl}?param=40x40`} alt="" />
            <div className="cnts f-fl">
                <h4 className="f-thide">{ name }</h4>
                <p className="f-thide">{ brand }</p>
            </div>
            <div className="hot f-fl">
                <Progress 
                    percent={getPercent(score, totalScore)} 
                    size="small" 
                    showInfo={false}
                    strokeColor="#ccc"
                />
            </div>
        </li>
    )
}

export default () => {

    const [recommend, setRecommend] = useState([])
    const getRecommend = async () => {
        const res = await radioApi.getRecommend();
        setRecommend(res);
    }

    const [topList, setToplist] = useState([]);
    const [totalScore, setTotal] = useState(0);
    const getToplists = async () => {
        const res = await radioApi.getToplists();
        setToplist(res);
        setTotal(res[0].score);
    }

    useEffect(() => {
        getRecommend();
        getToplists();
    }, [])

    return (
        <div className="recommend-radio">
            <section className="blk">
                <NavTitle title="推荐节目" />
                <ul className="toplist">
                    {
                        recommend.map((item, i) => {
                            return <RecommendItem key={item.id} {...{...item, idx:i}} />
                        })
                    }
                </ul>
            </section>
            <section className="blk">
                <NavTitle title="节目排行榜" />
                <ul className="toplist">
                    {
                        topList.map((item, i) => {
                            return <TopItem key={item.id} {...{...item, totalScore, idx: i}}  />
                        })
                    }
                </ul>
            </section>
        </div>
    )
}