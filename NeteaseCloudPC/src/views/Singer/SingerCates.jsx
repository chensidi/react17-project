import { useParams, Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import singerApi from '@/api/singer';
import SingerItem from './SingerItem';


const SingerCates = () => {

    const { path } = useParams();
    const [singerList, setList] = useState([]);
    const [title, setTitle] = useState('');

    const getHots = useCallback(async () => { //热门歌手
        const res = await singerApi.getHotSingers(20);
        setList(res)
    })

    const topSinger = useCallback(async () => { //推荐歌手
        const res = await singerApi.topSinger();
        setList(res.slice(0, 20))
    })

    useEffect(async () => {
        console.log(path);
        if (path === 'recommend') {
            topSinger();
            setTitle('推荐歌手')
        } else {
            getHots();
            setTitle('热门歌手')
        }
    }, [path])

    return (
        <div className="g-mn2">
            <div className="g-mn2c">
                <div className="g-wrap">
                    <div className="u-title f-cb">
                        <h3>
                            <span className="f-ff2">{ title }</span>
                        </h3>
                    </div>
                    <div className="m-sgerlist">
                        <ul className="m-cvrlst m-cvrlst-5 f-cb">
                            {
                                singerList.map(item => {
                                    return <SingerItem key={item.id} {...item} />
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingerCates;