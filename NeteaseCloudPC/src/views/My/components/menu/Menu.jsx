import { Menu, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { menuData } from './mock';
import userApi from '@/api/user';

const { SubMenu } = Menu;

const ListItem = (props) => {
    return (
        <div className="list-item">
            <div className="item-img">
                <img src={props.img} alt="" />
            </div>
            <div className="txt-info">
                <h4>{ props.name }</h4>
                <p>{ props.total }首</p>
            </div>
        </div>
    )
}

export const MyMenu = () => {
    const history = useHistory();
    const handleClick = (e) => {
        console.log(e);
        setK(e.key);
        history.push(`/my/music/${e.key}`)
    }

    const menuConvert = (menuItem) => {
        /* 
            1. 是否有后代
            2. 有后代则递归        
        */
       if (!menuItem?.children?.length) {
            if (menuItem.info) {
                return <Menu.Item key={menuItem.key}><ListItem {...menuItem.info} /></Menu.Item>
            } else {
                return <Menu.Item key={menuItem.key} icon={menuItem.icon}>{ menuItem.title }</Menu.Item>
            }
       } else {
           return (
            <SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.title}>
                {
                    menuItem.children.map(item => {
                        return menuConvert(item);
                    })
                }
            </SubMenu>
           )
       }
    }

    const user = useSelector(state => state.user.profile);
    const [realMenuData, setMenuData] = useState(menuData);
    const getPlayList = () => { //获取用户歌单
        userApi.getPlayList(user.userId).then(res => {
            // 设置到我的歌单二级菜单内
            menuData[3].children = [];
            res.map(item => {
                menuData[3].children.push({
                    key: item.id,
                    title: item.name,
                    info: {
                        id: item.id,
                        img: item.coverImgUrl,
                        total: item.trackCount,
                        name: item.name
                    }
                })
            })
            let newMenu = Object.assign([], menuData);
            setMenuData(newMenu);
        })
    }

    useEffect(() => {
        getPlayList();
    }, [])

    const [curKey, setK] = useState('artist');
    return (
        <Menu
            onClick={handleClick}
            style={{ width: 240, float: 'left' }}
            defaultOpenKeys={['mCreate']}
            selectedKeys={[curKey]}
            mode="inline"
        >
           {
               realMenuData.map(item => {
                   return menuConvert(item);
               })
           }
        </Menu>
    )
}