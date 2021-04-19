import Main from '@/components/Main';
import { Tabs } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import singerApi from '@/api/singer';

const { TabPane } = Tabs;
const subRouter = [
    'song',
    'album',
    'mv',
    'introduce'
]

const Singer = (props) => {

    const history = useHistory();
    const { id } = useParams();
    const [info, setInfo] = useState({});

    const tabChange = useCallback((key) => { //子页面跳转
        const path = subRouter[key - 1];
        history.push(`/singer/${id}/${path}`)
    }, [])

    const getSingerInfo = useCallback(async () => {
        const { artist={} } = await singerApi.getDetails(id);
        setInfo(artist);
    }, [])

    useEffect(() => { //默认初次跳转到歌手的歌曲子页
        getSingerInfo();
        history.replace(`/singer/${id}/song`);
    }, [])

    return (
        <div>
            <Main>
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
                            <Tabs onChange={tabChange} type="card">
                                <TabPane tab="热门作品" key="1">
                                </TabPane>
                                <TabPane tab="所有专辑" key="2">
                                </TabPane>
                                <TabPane tab="相关MV" key="3">
                                </TabPane>
                                <TabPane tab="艺人介绍" key="4">
                                </TabPane>
                            </Tabs>
                            { props.children }
                        </div>
                    </div>
                </div>
            </Main>
        </div>
    )
}

export default Singer;