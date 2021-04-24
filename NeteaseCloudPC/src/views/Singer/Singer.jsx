import Main from '@/components/Main';
import { Tabs } from 'antd';
import { useCallback, useEffect, useState, createContext, memo, useRef } from 'react';
import { useHistory, useParams, Link, useLocation } from 'react-router-dom';

import singerApi from '@/api/singer';

const { TabPane } = Tabs;
const subRouter = [
    'song',
    'album',
    'mv',
    'introduce'
]

export const Intrs = createContext({});

const SimiItem = (props) => {
    const { img1v1Url, name, id } = props;
    return (
        <li>
            <div className="hd">
                <Link to={`/singer/${id}`}>
                    <img src={img1v1Url} alt=""/>
                </Link>
            </div>
            <p>
                <Link to={`/singer/${id}`} className="nm nm-icn f-ib f-thide">{ name }</Link>
            </p>
        </li>
    )
}

const Singer = memo((props) => {

    const history = useHistory();
    const location = useLocation();
    let { id } = useParams();
    const [info, setInfo] = useState({});
    const [intr, setIntr] = useState({});
    const [simi, setSimi] = useState([]);
    const infos = useRef();
    const [active, setActive] = useState('song');

    const tabChange = useCallback((key) => { //子页面跳转
        const path = key;
        history.replace(`/singer/${id}/${path}?page=1`);
        setActive(key);
    }, [id])

    const getSingerInfo = useCallback(async () => {
        const { artist={} } = await singerApi.getDetails(id);
        setInfo(artist);
        infos.current = artist;
    }, [id])

    const getSingerIntr = useCallback(async () => {
        const res = await singerApi.getIntr(id);
        setIntr({
            ...res,
            ...infos.current
        });
    }, [id])

    const getSimi = useCallback(async () => {
        const res = await singerApi.getSimi(id);
        setSimi(res.slice(0, 6));
    }, [id])

    const init = useCallback(() => {
        getSingerInfo(id);
        getSingerIntr(id);
        getSimi(id);
        if (location.pathname === `/singer/${id}`) {
            history.replace(`/singer/${id}/song?page=1`)
        }
    }, [id])

    useEffect(async () => { //默认初次跳转到歌手的歌曲子页
        init();
        const subPath = location.pathname.match(/\/([^\/]{1,})$/)[1];
        setActive(subRouter.includes(subPath) ? subPath : 'song');
    }, [id])

    return (
        <Main className="g-bd4 f-cb">
            <div className="g-mn4">
                    <div className="g-mn4c">
                        <div className="g-wrap6">
                            <div className="n-artist f-cb">
                                <div className="btm">
                                    <h2 className="sname f-thide sname-max">
                                        { info.name }
                                    </h2>
                                    <h3 className="salias f-thide">
                                        {info.name}
                                    </h3>
                                </div>
                                <img src={info.cover} alt="" className=""/>
                                <div className="mask f-alpha"></div>
                                <span className="btnfav f-tid"></span>
                            </div>
                            <Tabs onChange={tabChange} type="card" activeKey={active}>
                                <TabPane tab="热门作品" key="song">
                                </TabPane>
                                <TabPane tab="所有专辑" key="album">
                                </TabPane>
                                <TabPane tab="相关MV" key="mv">
                                </TabPane>
                                <TabPane tab="艺人介绍" key="introduce">
                                </TabPane>
                            </Tabs>
                            <Intrs.Provider value={intr}>
                            { props.children }
                            </Intrs.Provider>
                        </div>
                    </div>
                </div>
                <div className="g-sd4">
                    <div className="g-wrap7">
                        <h3 className="u-hd3">
                            <span className="f-fl">相似歌手</span>
                        </h3>
                        <ul className="m-hdlist f-cb">
                            {
                                simi.map(item => {
                                    return <SimiItem key={item.id} {...item} />
                                })
                            }
                        </ul>
                    </div>
                </div>
        </Main>
    )
})

export default Singer;