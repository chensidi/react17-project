import { Component, PureComponent, memo } from 'react';
import { connect } from 'react-redux';
import { setCurSong, setSubNav, } from '@store/action';
import { Spin } from 'antd';

import sessionStore from '@utils/sessionStore';
import AsyncComponent from '@/components/AsyncComponent';
import { homeApis } from '@/api/home';
import homeConfig from './config';
import NewDiskSwiper from './Swiper';
import Main from '@/components/Main';
import { SingerBlock, DjBlock, UserInfo, Login } from './AsideComponents';
import homeAction from './store/action';
import { playList } from '@/utils/utils';

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
        hotDjs: state.homeData.hotDjs,
        token: state.user.token
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
            // this._loadBanners(),
            this._getRecommend(),
            // this._getNewDisk(),
            // this._getTopList(),
            // this._getHotSingers(),
            // this._getHotDjs()
        ]).then(() => {
            timer = setTimeout(() => this.setState({loading: false}), 500)
        })
    }

    componentWillUnmount() {
        clearTimeout(timer);
        timer = null;
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
   
    render() {
        const { 
            banners, 
            recommends, 
            newDisk, ranks, 
            loading, 
            hotSingers,
            hotDjs } = this.state;
        const { hotNav } = homeConfig;
        return (
            <div>
                <Spin tip="Loading..." spinning={loading}>
                <Banner />
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
                                                    recommends.map((item, i) => {
                                                        return (
                                                            <CoverItem 
                                                            playFn={playList}
                                                            key={item.id + i} 
                                                            {...item} />
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className="n-new">
                                            <BlockTitle title={{path: '', txt: '新碟上架'}} />
                                            <NewDiskSwiper />
                                        </div>
                                        <div className="n-bill">
                                            <BlockTitle title={{path: '/home/toplist', txt: '榜单'}} />
                                            <RankModule />
                                        </div>
                                        </>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="g-sd1">
                        <div className="n-user-profile">
                            {
                                this.props.token ?
                                <UserInfo /> :
                                <Login />
                            }
                        </div>
                        <SingerBlock />
                        <DjBlock />
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