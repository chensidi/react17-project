import NavTitle from '@/components/Common/NavTitle';
import radioApi from '@api/radio';

import { useEffect, useState } from 'react'; 
import { Progress, Icon } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

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

const TopTag = ({rank, lastRank}) => {
    if (lastRank === -1) { //new
        return <i>NEW</i>
    } else if (rank >= lastRank) { //down
        return <>
                <ArrowDownOutlined style={{color: '#4abbeb', fontSize: 12}} />
                <span className="rnk-down">{ rank - lastRank }</span>
               </>
    } else { //up
        return <>
                <ArrowUpOutlined style={{color: '#ba2226', fontSize: 12}} />
                <span className="rnk-up">{ lastRank - rank }</span>
               </>
    }
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
    lastRank,
    totalScore,
    score,
    idx
}) => {
    return (
        <li className={`itm ${idx % 2 && 'bg'}`}>
            <div className="rank s-fc4 f-fl">
                <em className={`${idx < 3 && 'top3'}`}>{rank.toString().padStart(2, 0)}</em>
                <TopTag {...{rank, lastRank}} />
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
                    strokeWidth={8}
                />
            </div>
        </li>
    )
}

export default () => {

    //推荐节目
    const [recommend, setRecommend] = useState([])
    const getRecommend = async () => {
        const res = await radioApi.getRecommend();
        setRecommend(res);
    }

    //节目榜
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
                            return <TopItem key={`${item.id}-${i}`} {...{...item, totalScore, idx: i}}  />
                        })
                    }
                </ul>
            </section>
        </div>
    )
}