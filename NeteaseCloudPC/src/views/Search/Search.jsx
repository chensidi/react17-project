import { Component, Fragment, } from 'react';
import AsyncComponent from '@/components/AsyncComponent';
import { Tabs, Spin, } from 'antd';
import { searchApi } from '@/api/search';
import { SongItem, SingerItem, AlbumItem, VideoItem, LrcItem, PlayLists, } from './components';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const Main = AsyncComponent(() => import('@/components/Main'));

class SearchPage extends Component {
    state = {
        kw: '',
        curType: '1', //当前选项卡类型 默认1 单曲
        curNum: 0, //当前数量
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
        artists: [],
        albums: [],
        videos: [],
        lyrics: [],
        playLists: [],
        loading: false,
    }
    componentDidMount() {
        let kw = this.props.location.search.match(/kw=(.+)/)[1];
        kw = decodeURIComponent(kw);
        setTimeout(() => {this.searchInput.value = kw;}, 100)
        this.search(kw, '1');
        this.setState({kw});
    }
    callback = (key) => {
        this.searchInput.value = this.state.kw;
        this.setState({
            curType: key
        })
        this.search(this.state.kw, key);
    }

    search = (kw, type) => { //搜索
        this.setState({loading: true});
        searchApi.searchByKw(kw, type).then(res => {
            let target, data;
            switch (type) {
                case '1': 
                    if (res.songs) {
                        target = 'songList';
                        data = res.songs;
                    }
                    break;
                case '10':
                    if (res.albums) {
                        target = 'albums';
                        data = res.albums;
                    }
                    break;
                case '100':
                    if (res.artists) {
                        target = 'artists';
                        data = res.artists;
                    }
                    break;
                case '1014':
                    if (res.videos) {
                        target = 'videos';
                        data = res.videos;
                    }
                    break;
                case '1006':
                    if (res.songs) {
                        target = 'lyrics';
                        data = res.songs;
                    }
                    break;
                case '1000':
                    if (res.playlists) {
                        target = 'playLists';
                        data = res.playlists;
                    }
                    break;
            }
            if (data) {
                setTimeout(() => {
                    this.setState({loading: false})
                }, 500)
                this.setState({[target]: data, curNum: data.length})
            }
        })
    }

    searchHandler = (e) => {
        if (e.code === 'Enter' && e.target.value !== '') {
            this.search(e.target.value, this.state.curType);
        }
    }

    changeHandler = (e) => {
        if (e.target.value) {
            this.setState({kw: e.target.value});
        }
    }

    render() {
        const { 
            tabs, 
            songList, 
            curType, 
            artists, 
            loading,
            curNum, 
            albums,
            videos,
            lyrics,
            playLists,
            kw,
        } = this.state;
        return (
            <Main className="g-bd">
                <div className="g-wrap n-srch">
                    <div className="pgsrch f-pr j-suggest">
                        <input 
                            type="text" 
                            className="srch j-flag" 
                            ref={el => this.searchInput = el} 
                            onKeyPress={this.searchHandler}
                            onChange={this.changeHandler}
                        />
                        <span className="btn j-flag" title="搜索" onClick={() => this.search(kw, curType)}></span>
                    </div>
                    <section>
                        <div className="snote s-fc4 ztag">
                        搜索“咖啡”，找到 <em className="s-fc6">{ curNum }</em> 首{ tabs[curType] }
                        </div>
                        <Tabs onChange={this.callback} type="card">
                            <TabPane tab='单曲' key='1'>
                                <Spin tip="Loading..." spinning={loading}>
                                    <div className="n-srchrst">
                                        <div className="srchsongst">
                                            {
                                                songList.map((song, i) => {
                                                    return (
                                                        <SongItem key={song.id} {...song} i={i} />
                                                    )
                                                }) 
                                            }
                                        </div>
                                    </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='歌手' key='100'>
                                <Spin tip="Loading..." spinning={loading}>
                                    <div className="n-srchrst ztag">
                                    <div className="m-sgerlist m-sgerlist-1">
                                    <ul className="m-cvrlst m-cvrlst-5 f-cb">
                                        {
                                            artists.map(artist => {
                                                return (
                                                    <SingerItem key={artist.id} {...artist} />
                                                )
                                            })
                                        }
                                    </ul>
                                    </div>
                                </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='专辑' key='10'>
                                <Spin tip="Loading..." spinning={loading}>
                                <div className="n-srchrst ztag">
                                    <ul className="m-cvrlst m-cvrlst-alb3 f-cb">
                                        {
                                            albums.map(album => {
                                                return (
                                                    <AlbumItem key={album.id} {...album} />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='视频' key='1014'>
                                <Spin tip="Loading..." spinning={loading}>
                                <div className="n-srchrst ztag">
                                    <ul className="m-mvlist f-cb">
                                        {
                                            videos.map(video => {
                                                return (
                                                    <VideoItem key={video.vid} {...video} />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='歌词' key='1006'>
                                <Spin tip="Loading..." spinning={loading}>
                                <div className="n-srchrst">
                                    <div className="srchsongst">
                                        {
                                            lyrics.map((lyric, i) => {
                                                return (
                                                    <Fragment key={lyric.id}>
                                                        <SongItem {...lyric} i={i} />
                                                        <LrcItem {...lyric} />
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='歌单' key='1000'>
                                <Spin tip="Loading..." spinning={loading}>
                                <div className="n-srchrst">
                                    <PlayLists list={playLists}  />
                                </div>
                                </Spin>
                            </TabPane>
                        </Tabs>
                    </section>
                </div>
            </Main>
        )
    }
}

export default SearchPage;