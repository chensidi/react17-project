import { Component, createRef, } from 'react';
import AsyncComponent from '@/components/AsyncComponent';
import { Tabs, Spin, } from 'antd';
import { Link } from 'react-router-dom';
import { searchApi } from '@/api/search';
import { mediaTimeFormat, artistsFormat, } from '@/utils/utils';

const { TabPane } = Tabs;
const Main = AsyncComponent(() => import('@/components/Main'));

class SearchPage extends Component {
    state = {
        curType: '1', //当前选项卡类型 默认1 单曲
        tabs: {
            '1': '单曲',
            '10': '专辑',
            '100': '歌手',
            '1000': '歌单',
            '1002': '用户',
            '1006': '歌词',
            '1009': '电台',
            '1014': '视频',
        },
        songList: [],
        artists: []
    }
    componentDidMount() {
        let kw = this.props.location.search.match(/kw=(.+)/)[1];
        kw = decodeURIComponent(kw);
        setTimeout(() => {this.searchInput.value = kw;}, 100)
        this.search(kw, '1');
    }
    callback = (key) => {
        console.log(key);
        this.setState({
            curType: key
        })
        this.search(this.searchInput.value, key);
    }

    search = (kw, type) => { //搜索
        searchApi.searchByKw(kw, type).then(res => {
            switch (type) {
                case '1': 
                    res.songs && this.setState({
                        songList: res.songs
                    })
                    break;
                case '100':
                    res.artists && this.setState({
                        artists: res.artists
                    })
                    break;
            }
        })
    }

    searchHandler = (e) => {
        if (e.code === 'Enter' && e.target.value != '') {
            this.search(e.target.value, this.state.curType);
        }
    }

    render() {
        const { tabs, songList, curType, artists } = this.state;
        return (
            <Main className="g-bd">
                <div className="g-wrap n-srch">
                    <div className="pgsrch f-pr j-suggest">
                        <input 
                            type="text" 
                            className="srch j-flag" 
                            ref={el => this.searchInput = el} 
                            onKeyPress={this.searchHandler}
                        />
                        <span className="btn j-flag" title="搜索"></span>
                    </div>
                    <section>
                        <div className="snote s-fc4 ztag">
                        搜索“咖啡”，找到 <em className="s-fc6">20</em> 首{ tabs[curType] }
                        </div>
                        <Tabs onChange={this.callback} type="card">
                            <TabPane tab='单曲' key='1'>
                                <Spin tip="Loading..." delay={1000} spinning={songList.length == 0}>
                                    <div className="n-srchrst">
                                        <div className="srchsongst">
                                            {
                                                songList.map((song, i) => {
                                                    return (
                                                    <div className={['item f-cb h-flag', i%2?'':'even'].join(' ')} key={song.id}>
                                                    <div className="td">
                                                        <div className="hd">
                                                            <i className="ply"></i>
                                                        </div>
                                                    </div>
                                                    <div className="td w0">
                                                        <div className="sn">
                                                            <div className="text">
                                                                <Link to="">{ song.name }</Link>
                                                                { song.mv ? <Link to="" className="mv"></Link> : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="td">
                                                        <div className="opt hshow">
                                                            <i className="u-icn u-icn-81 icn-add"></i>
                                                            <i className="icn icn-fav"></i>
                                                            <i className="icn icn-share"></i>
                                                            <i className="icn icn-dl"></i>
                                                        </div>
                                                    </div>
                                                    <div className="td w1">
                                                        <div className="text">
                                                            <Link to="">{ artistsFormat(song.ar) }</Link>
                                                        </div>
                                                    </div>
                                                    <div className="td w2">
                                                        <div className="text">
                                                            <Link to="">《{song.al.name}》</Link>
                                                        </div>
                                                    </div>
                                                    <div className="td">{ mediaTimeFormat(song.dt/1000) }</div>
                                                </div>
                                                    )
                                                }) 
                                            }
                                        </div>
                                    </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='歌手' key='100'>
                                <div className="n-srchrst ztag">
                                    <div className="m-sgerlist m-sgerlist-1">
                                    <ul className="m-cvrlst m-cvrlst-5 f-cb">
                                        {
                                            artists.map(artist => {
                                                return (
                                                    <li key={artist.id}>
                                                        <div className="u-cover u-cover-5">
                                                            <Link to="">
                                                                <img src={artist.img1v1Url} alt=""/>
                                                                <span className="msk"></span>
                                                            </Link>
                                                        </div>
                                                        <p>
                                                            <Link to="" className="nm f-thide s-fc0">
                                                                { artist.name }
                                                            </Link>
                                                            <Link to="">
                                                            <i className="u-icn u-icn-5"></i>
                                                            </Link>
                                                        </p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </section>
                </div>
            </Main>
        )
    }
}

export default SearchPage;