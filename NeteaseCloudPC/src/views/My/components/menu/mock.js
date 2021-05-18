import { WechatOutlined, VideoCameraFilled, CustomerServiceFilled, FileFilled, HeartFilled, UserOutlined } from '@ant-design/icons';

export const menuData = [
    {
        title: '我的歌手',
        key: 'mSinger',
        icon: <UserOutlined />
    },
    {
        title: '我的视频',
        key: 'mVideo',
        icon: <VideoCameraFilled />
    },
    {
        title: '我的电台',
        key: 'mRadio',
        icon: <CustomerServiceFilled />
    },
    {
        title: '创建的歌单',
        key: 'mCreate',
        icon: <FileFilled />,
        children: [
            {
                title: 'Option 5',
                key: 'key5'
            },
            {
                title: 'Option 6',
                key: 'key6'
            }
        ]
    },
    {
        title: '收藏的歌单',
        key: 'mCollect',
        icon: <HeartFilled />,
        children: [
            {
                title: 'Option 7',
                key: 'key7'
            },
            {
                title: 'Option 8',
                key: 'key8'
            }
        ]
    }
]