import { Component } from 'react';
import { connect } from 'react-redux';
import { setCurSong } from '@store/action';
import { Button } from 'antd';
import sessionStore from '@utils/sessionStore';
import AsyncComponent from '@/components/AsyncComponent';
import { homeApis } from '@/api/home';
import homeConfig from './config';
import { Carousel } from 'antd';

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
    };
    componentDidMount() {
        this._loadBanners();
        this._getRecommend();
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
    change = () => {
        this.props.setCurSong({
            song: 'aaa',
            url: 'ddd',
            singer: 'jacky'
        })
    }
    render() {
        const { banners, recommends, } = this.state;
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
                                    <div className="new-swiper">
                                    <Carousel>
                                        <ul className="n-disk">
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                        </ul>
                                        <ul className="n-disk">
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                            <li>
                                                <div className="u-cover u-cover-alb1">
                                                    <img src="http://p4.music.126.net/n4RF-YN_cfRP-IMhYQ3cjQ==/109951165639721150.jpg?param=100y100" alt=""/>
                                                    <a href="" className="msk"></a>
                                                </div>
                                                <p className="f-thide">
                                                    <a href="" className="s-fc0 tit">Epik High Is Here 上</a>
                                                </p>
                                                <p className="tit f-thide">
                                                    <a href="" className="s-fc3">Epik High</a>
                                                </p>
                                            </li>
                                        </ul>
                                    </Carousel>
                                    </div>
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
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);