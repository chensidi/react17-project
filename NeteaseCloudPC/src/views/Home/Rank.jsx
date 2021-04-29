import './index.scss';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { playList, addToPlay, playItem } from '@/utils/utils';

const LiItem = (props) => {
    const { item, idx } = props;
    return (
        <li>
            <span className={['no', idx < 3 ? 'no-top' : ''].join(' ')}>
                {idx + 1}
            </span>
            <span className="nm s-fc0 f-thide" title={item.name}>
                <Link to={`/song/${item.id}`}>
                    {item.name}
                </Link>
            </span>
            <div className="oper">
                <em title="播放" className="s-bg s-bg-11" onClick={() => playItem(item.id)}></em>
                <em title="添加到播放列表" className="u-icn u-icn-81" onClick={() => addToPlay(item.id)}></em>
                <em title="收藏" className="s-bg s-bg-12"></em>
            </div>
        </li>
    )
}
const RankModule = (props) => {
    const {ranks} = props;
    return (
        <div className="n-bilst">
            {
                ranks.map((rank, x) => {
                    return (
                        <dl className={['blk', x===ranks.length-1?'blk-1':''].join(' ')} key={rank.self.id}>
                            <dt className="top">
                                <div className="cver u-cover u-cover-4">
                                    <img src={rank.self.coverImgUrl} className="j-img" alt=""/>
                                    <Link to={`/home/toplist/${rank.self.id}`} className="msk">
                                    </Link>
                                </div>
                                <div className="tit">
                                    <div title={rank.self.name}>
                                        <Link to={`/home/toplist/${rank.self.id}`} className="f-fs1 f-thide">
                                            {rank.self.name}
                                        </Link>
                                    </div>
                                    <div className="btn">
                                        <span className="s-bg s-bg-9 f-tdn" onClick={() => playList(rank.self.id)}>
                                            播放
                                        </span>
                                        <span className="s-bg s-bg-10 f-tdn subscribe-flag">
                                            收藏
                                        </span>
                                    </div>
                                </div>
                            </dt>
                            <dd>
                                <ol>
                                    {
                                        rank.subs.map((item, i) => {
                                            return (
                                                <LiItem key={item.id} item={item} idx={i}  />
                                            )
                                        })
                                    }
                                </ol>
                            </dd>
                        </dl>
                    )
                })
            }
        </div>
    )
}

export default memo(RankModule);