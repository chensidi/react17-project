import { Component } from 'react';
import { connect } from 'react-redux';
import { setCurSong } from '@store/action';
import { Button } from 'antd';
import sessionStore from '@utils/sessionStore';
import AsyncComponent from '@/components/AsyncComponent';
import { homeApis } from '@/api/home';
import homeConfig from './config';

const Banner = AsyncComponent(() => import('@/components/Banner/Banner'))
const Main = AsyncComponent(() => import('@/components/Main'));
const BlockTitle = AsyncComponent(() => import('@/components/BlockTitle'));

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
    };
    componentDidMount() {
        this._loadBanners();
    }
    _loadBanners = async () => {
        let res = await homeApis.getBanners();
        this.setState({
            banners: res
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
        const { banners } = this.state;
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