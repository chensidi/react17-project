import { Tabs } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import singerApi from '@/api/singer';
import SingerItem  from './SingerItem';
import { cateList, typeList } from './CateAside';

const { TabPane } = Tabs;

function createCateList() {
    const list = [];
    for(let i = 65; i <= 90; i ++) {
        const item = {
            code: String.fromCharCode(i),
            name: String.fromCharCode(i)
        };
        list.push(item);
    }
    list.unshift({
        code: '',
        name: '全部'
    });
    return list;
}

const SingerMoreCates = () => {

    const { area, type } = useParams();

    const [cates, setCates] = useState(createCateList());
    const [initial, setInitial] = useState('');
    const [singerList, setSingers] = useState([]);
    const [title, setTitle] = useState('');

    const initialChange = useCallback((key) => {
        setInitial(key);
    }, [])

    const getSinger = useCallback(async () => {
        const res = await singerApi.getCateList({
            type, 
            area,
            initial
        });
        setSingers(res.slice(0, 10));
    }, [area, type, initial])

    const getTitle = useCallback(() => {
        for (let i = 0; i < cateList.length; i ++) {
            if (cateList[i].val == area) {
                let types = typeList[type - 1];
                let title = `${cateList[i].name}${types}`;
                setTitle(title);
            }
        }
    }, [area, type])

    useEffect(() => {
        getSinger();
        getTitle();
    }, [area, type, initial])

    return (
        <div className="g-mn2">
            <div className="g-mn2c">
                <div className="g-wrap">
                    <div className="u-title f-cb">
                        <h3>
                            <span className="f-ff2">{ title }</span>
                        </h3>
                    </div>
                    <div className="n-ltlst">
                        <Tabs type="card" size="small" onChange={initialChange}>
                            {
                                cates.map(cate => {
                                    return (
                                        <TabPane tab={cate.name} key={cate.code}>
                                        </TabPane>
                                    )
                                })
                            }
                        </Tabs>
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

export default SingerMoreCates;