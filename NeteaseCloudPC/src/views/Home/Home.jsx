import { Component, PureComponent, memo } from 'react';
import { connect } from 'react-redux';
import { setCurSong, setSubNav, } from '@store/action';
import { Spin } from 'antd';

import sessionStore from '@utils/sessionStore';
import AsyncComponent from '@/components/AsyncComponent';
import { homeApis } from '@/api/home';
import singerApi from '@/api/singer';
import djApi from '@/api/dj';
import homeConfig from './config';
import NewDiskSwiper from './Swiper';
import Main from '@/components/Main';
import { SingerBlock, DjBlock } from './AsideComponents';
import homeAction from './store/action';
// import './index.scss';

const Banner = AsyncComponent(() => import('@/components/Banner/Banner'))
const BlockTitle = AsyncComponent(() => import('@/components/BlockTitle'));
const CoverItem = AsyncComponent(() => import('@/components/Covers/CoverItem'));
const RankModule = AsyncComponent(() => import('./Rank'));

const mapStateToProps = (state) => {
    // console.log(state.globalData.curSong);
    return {
        curSong: state.globalData.curSong ? 
        state.globalData.curSong : sessionStore.get('globalData').curSong,
        userInfo: state.user.userInfo,
        banners: state.homeData.banners,
        recommends: state.homeData.recommends,
        newDisk: state.homeData.newDisk,
        ranks: state.homeData.ranks,
        hotSingers: state.homeData.hotSingers,
        hotDjs: state.homeData.hotDjs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurSong: (song) => dispatch(setCurSong(song)),
        setSubNav: (show) => dispatch(setSubNav(show)),
        setBanners: (banners) => dispatch(homeAction.setBanners(banners)),
        setRecommends: recommends => dispatch(homeAction.setRecommends(recommends)),
        setNewDisk: newDisk => dispatch(homeAction.setNewDisk(newDisk)),
        setRanks: ranks => dispatch(homeAction.setRanks(ranks)),
        setHotSingers: hotSingers => dispatch(homeAction.setHotSingers(hotSingers)),
        setHotDjs: hotDjs => dispatch(homeAction.setHotDjs(hotDjs))
    }
}

let timer;

class Home extends PureComponent {
    state = {
        banners: [],
        recommends: [],
        newDisk: [],
        ranks: [],
        loading: false,
        hotSingers: [],
        hotDjs: []
    };
    async componentDidMount() {
        this.props.setSubNav(true);
        this.setState({loading: true});
        Promise.all([
            this._loadBanners(),
            this._getRecommend(),
            this._getNewDisk(),
            this._getTopList(),
            this._getHotSingers(),
            this._getHotDjs()
        ]).then(() => {
            timer = setTimeout(() => this.setState({loading: false}), 500)
        })
    }

    componentWillUnmount() {
        clearTimeout(timer);
        timer = null;
    }

    _loadBanners = async () => { //轮播图
        let res = this.props.banners;
        if (res.length === 0) {
            res = await homeApis.getBanners();
            this.props.setBanners(res);
        }
        this.setState({
            banners: res
        })
    }
    _getRecommend = async () => {
        let res = this.props.recommends;
        if (res.length === 0) {
            res = await homeApis.getRecommend({limit: 8, order: 'hot'});
            this.props.setRecommends(res);
        }
        this.setState({
            recommends: res
        })
    }
    _getNewDisk = async () => {
        let res = this.props.newDisk;
        if (res.length === 0) {
            res = await homeApis.getNewDisk({limit: 10});
            this.props.setNewDisk(res);
        }
        this.setState({
            newDisk: [[...res.slice(0,5)], [...res.slice(5,)]]
        })
    }
    _getRank = async (id) => {
        let res = await homeApis.getRank(id);
        return res.tracks;
    }
    _getTopList = async () => {
        let arr = this.props.ranks;
        if (arr.length === 0) {
            let res = await homeApis.getTopList();
            res = res.slice(0, 3); //取出前三个
            for (let i = 0; i < res.length; i ++) {
                const item = res[i];
                let res1 = await this._getRank(item.id);
                arr.push({
                    self: item,
                    subs: res1.slice(0, 10)
                })
            }
            this.props.setRanks(arr);
        }
        
        this.setState({
            ranks: arr
        })
    }

    _getHotSingers = async () => {
        let singers = this.props.hotSingers;
        if (singers.length === 0) {
            singers = await singerApi.getHotSingers(5);
            this.props.setHotSingers(singers);
        }
        this.setState({hotSingers: singers});
    }

    _getHotDjs = async () => {
        let djs = this.props.hotDjs;
        if (djs.length === 0) {
            djs = await djApi.getHotDjs(5);
            this.props.setHotDjs(djs);
        }
        this.setState({hotDjs: djs.list});
    }
    
    render() {
        const { banners, 
            recommends, 
            newDisk, ranks, 
            loading, 
            hotSingers,
            hotDjs } = this.state;
        const { hotNav } = homeConfig;
        return (
            <div>
                <Spin tip="Loading..." spinning={loading}>
                <Banner banners={banners} />
                <Main className="g-bd1">
                    <div className="g-mn1">
                        <div className="g-mn1c">
                            <div className="g-wrap3">
                                {
                                    !loading ? (
                                        <>
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
                                        <div className="n-bill">
                                            <BlockTitle title={{path: '/home/toplist', txt: '榜单'}} />
                                            <RankModule ranks={ranks} />
                                        </div>
                                        </>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="g-sd1">
                        <div className="n-user-profile">
                            <div className="n-myinfo n-myinfo-1 s-bg s-bg-1">
                                <p className="note s-fc3">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                                <span className="btn s-bg s-bg-2 f-tdn">用户登录</span>
                            </div>
                        </div>
                        <SingerBlock hotSingers={hotSingers} />
                        <DjBlock hotDjs={hotDjs} />
                    </div>
                </Main>
                {
                    this.props.children
                }
                </Spin>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);