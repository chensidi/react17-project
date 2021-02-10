import { Component } from 'react';
import { connect } from 'react-redux';
import { setCurSong } from '@store/action';
import { Button } from 'antd';
import sessionStore from '@utils/sessionStore';
import AsyncComponent from '@/components/AsyncComponent';
import { homeApis } from '@/api/home';
import homeConfig from './config';
import NewDiskSwiper from './Swiper';

const Banner = AsyncComponent(() => import('@/components/Banner/Banner'))
const Main = AsyncComponent(() => import('@/components/Main'));
const BlockTitle = AsyncComponent(() => import('@/components/BlockTitle'));
const CoverItem = AsyncComponent(() => import('@/components/Covers/CoverItem'));

const mapStateToProps = (state) => {
    console.log(state.globalData.curSong);
    return {
        curSong: state.globalData.curSong ? 
        state.globalData.curSong : sessionStore.get('globalData').curSong,
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        setCurSong: (song) => dispath(setCurSong(song))
    }
}

class Home extends Component {
    state = {
        banners: [],
        recommends: [],
        newDisk: [],
    };
    componentDidMount() {
        this._loadBanners();
        this._getRecommend();
        this._getNewDisk();
    }
    _loadBanners = async () => { //轮播图
        let res = await homeApis.getBanners();
        this.setState({
            banners: res
        })
    }
    _getRecommend = async () => {
        let res = await homeApis.getRecommend({limit: 8, order: 'hot'});
        console.log(res);
        this.setState({
            recommends: res
        })
    }
    _getNewDisk = async () => {
        let res = await homeApis.getNewDisk({limit: 10});
        this.setState({
            newDisk: [[...res.slice(0,5)], [...res.slice(5,)]]
        })
    }
    change = () => {
        this.props.setCurSong({
            song: 'aaa',
            url: 'ddd',
            singer: 'jacky'
        })
    }
    changeSwiper = (flag) => {
        flag ? this.swp.next() : this.swp.prev()
    }
    render() {
        const { banners, recommends, newDisk, } = this.state;
        const { hotNav } = homeConfig;
        return (
            <div>
                <Banner banners={banners} />
                <Main className="g-bd1">
                    <div className="g-mn1">
                        <div className="g-mn1c">
                            <div className="g-wrap3">
                                <div className="n-rcmd">
                                    <BlockTitle {...hotNav} />
                                    <ul className="m-cvrlst f-cb">
                                        {
                                            recommends.map(item => {
                                                return (
                                                    <CoverItem key={item.id} {...item} />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="n-new">
                                    <BlockTitle title={{path: '', txt: '新碟上架'}} />
                                    <NewDiskSwiper newDisk={newDisk} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Main>
                <div>
                    {
                        this.props.curSong && (
                            <p>
                                {this.props.curSong.name}
                                {this.props.curSong.url}
                                {this.props.curSong.singer}
                                {this.props.userInfo.name}
                            </p>
                        )
                    }
                    
                </div>
                <p>
                    <Button onClick={this.change}>change song</Button>
                </p>
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);