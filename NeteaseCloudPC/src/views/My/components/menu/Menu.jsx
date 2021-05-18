import { Menu, Switch } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { menuData } from './mock';

const { SubMenu } = Menu;

export const MyMenu = () => {

    const handleClick = (e) => {
        console.log(e);
        setK(e.key)
    }

    const menuConvert = (menuItem) => {
        /* 
            1. 是否有后代
            2. 有后代则递归        
        */
       if (!menuItem?.children?.length) {
           return <Menu.Item key={menuItem.key} icon={menuItem.icon}>{ menuItem.title }</Menu.Item>
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

    const [curKey, setK] = useState('mSinger');
    return (
        <Menu
            onClick={handleClick}
            style={{ width: 240, float: 'left' }}
            defaultOpenKeys={['mCreate']}
            selectedKeys={[curKey]}
            mode="inline"
        >
           {
               menuData.map(item => {
                   return menuConvert(item);
               })
           }
        </Menu>
    )
}