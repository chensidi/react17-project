import { Button, Popover, Divider  } from 'antd';
import { DownOutlined, GlobalOutlined, ControlOutlined, CoffeeOutlined, SmileOutlined, CustomerServiceOutlined } from '@ant-design/icons';

import Main from '@/components/Main';
import topListApi from '@/api/toplist';
import { useEffect, useState } from 'react';

const icons = [
    <GlobalOutlined className="cate-ico" />,
    <ControlOutlined className="cate-ico" />,
    <CoffeeOutlined className="cate-ico" />,
    <SmileOutlined className="cate-ico" />,
    <CustomerServiceOutlined className="cate-ico" />
]

function formatCateLists(categories, subs) { //歌单分类整理
    const cateLists = new Array(categories.length);
    subs.map(sub => {
        let idx = sub.category;
        if (!cateLists[idx]) {
            cateLists[idx] = {
                title: '',
                sub: []
            }
        }
        if (!cateLists[idx].title) {
            cateLists[idx].title = categories[idx];
        }
        if (!cateLists[idx].icon) {
            cateLists[idx].icon = icons[idx];
        }
        cateLists[idx].sub.push(sub.name);
    })

    return cateLists;
}

function createCatePannel(cateLists, clickHanddler) {
    return (
        <div className="cateListBox">
            <div>
                <Button>全部风格</Button>
            </div>
            <Divider />
            <div className="cate-con">  
                {
                    cateLists.map(cate => {
                        return (
                            <div className="cate-list" key={cate.title}>
                                <div className="cate-tt">
                                    { cate.icon }
                                    { cate.title }
                                </div>
                                <div className="cate-group">
                                    {
                                        cate.sub.map(item => {
                                            return <em onClick={() => clickHanddler(item)} key={item} className="cate-item">{ item }</em>
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    )
}

export default ({fn}) => {

    const [showCate, setShowCate] = useState(false);
    const [content, setCon] = useState(null);
    const getCateLists = async () => { //获取所有歌单种类
        const res = await topListApi.getCatlist();
        const cateLists = formatCateLists(Object.values(res.categories), res.sub)
        setCon(createCatePannel(cateLists, catClick))
    }

    function catClick(cat) {
        setShowCate(false);
        console.log(cat);
        fn({cat})
    }

    useEffect(() => {
        getCateLists();
    }, [])

    return (
        <Popover 
            onVisibleChange={visible => setShowCate(visible)}
            visible={showCate} 
            placement="bottomLeft" 
            content={content} 
            trigger="click"
        >
            <Button size="small" icon={<DownOutlined />} className="choose-kind">选择分类</Button>
        </Popover>
    )
} 
