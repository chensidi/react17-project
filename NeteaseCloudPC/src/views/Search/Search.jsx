import { Component } from 'react';
import AsyncComponent from '@/components/AsyncComponent';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { searchApi } from '@/api/search';
import { mediaTimeFormat } from '@/utils/utils'

const { TabPane } = Tabs;
const Main = AsyncComponent(() => import('@/components/Main'));

class SearchPage extends Component {
    state = {
        tabs: [
            {title: '单曲', type: 1},
            {title: '专辑', type: 10},
            {title: '歌手', type: 100},
            {title: '歌单', type: 1000},
            {title: '用户', type: 1002},
            {title: '歌词', type: 1006},
            {title: '电台', type: 1009},
            {title: '视频', type: 1014},
        ],
        songList: []
    }
    componentDidMount() {
        console.log(this.props.location.search.match(/kw=(.+)/));
        let kw = this.props.location.search.match(/kw=(.+)/)[1];
        kw = decodeURIComponent(kw)
        this.search(kw, 1);
    }
    callback = (key) => {
        console.log(key);
    }

    search = (kw, type) => {
        searchApi.searchByKw(kw, type).then(res => {
            this.setState({
                songList: res.songs
            })
        })
    }

    render() {
        const {tabs, songList} = this.state;
        return (
            <Main>
                <div className="g-wrap n-srch">
                    <div className="pgsrch f-pr j-suggest">
                        <input type="text" className="srch j-flag"/>
                        <span className="btn j-flag" title="搜索"></span>
                    </div>
                    <section>
                        <div className="snote s-fc4 ztag">
                        搜索“咖啡”，找到 <em className="s-fc6">20</em> 首单曲
                        </div>
                        <Tabs onChange={this.callback} type="card">
                            {
                                tabs.map(tab => {
                                    return (
                                        <TabPane tab={tab.title} key={tab.type}>
                                            Content of Tab Pane { tab.title }
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
                                                                        <Link to="" className="mv"></Link>
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
                                                                    <Link to="">{ song.ar[0].name }</Link>
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
                                        </TabPane>
                                    )
                                })
                            }
                        </Tabs>
                    </section>
                </div>
            </Main>
        )
    }
}

export default SearchPage;