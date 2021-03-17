import { Component, Fragment, } from 'react';
import { Tabs, Spin, } from 'antd';
import { searchApi } from '@/api/search';
import { setSubNav } from '@/store/action';
import store from '@/store';
import Main from '@/components/Main';
import { SongItem, SingerItem, AlbumItem, VideoItem, LrcItem, PlayLists, DJItem, UserPanel, NotResult, } from './components';

const { TabPane } = Tabs;
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
            '1009': '声音主播',
            '1014': '视频',
        },
        songList: [],
        artists: [],
        albums: [],
        videos: [],
        lyrics: [],
        playLists: [],
        djRadios: [],
        userprofiles: [],
        loading: false,
        unit: '首'
    }
    componentDidMount() {
        store.dispatch(setSubNav(false));
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
            let target, data, unit;
            switch (type) {
                case '1': 
                    target = 'songList';
                    data = res?.songs || [];
                    unit = '首';
                    break;
                case '10':
                    target = 'albums';
                    data = res?.albums || [];
                    unit = '张';
                    break;
                case '100':
                    target = 'artists';
                    data = res?.artists || [];
                    unit = '位';
                    break;
                case '1014':
                    target = 'videos';
                    data = res?.videos || [];
                    unit = '个';
                    break;
                case '1006':
                    target = 'lyrics';
                    data = res?.songs || [];
                    unit = '个';
                    break;
                case '1000':
                    target = 'playLists';
                    data = res?.playlists || [];
                    unit = '个';
                    break;
                case '1009':
                    target = 'djRadios';
                    data = res?.djRadios || [];
                    unit = '位';
                    break;
                case '1002':
                    target = 'userprofiles';
                    data = res?.userprofiles || [];
                    unit = '位';
                    break;
            }
            if (data) {
                setTimeout(() => {
                    this.setState({loading: false})
                }, 500)
                this.setState({[target]: data, curNum: data.length, unit})
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
            djRadios,
            userprofiles,
            kw,
            unit,
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
                        搜索“{kw}”，找到 <em className="s-fc6">{ curNum }</em> { unit }{ tabs[curType] }
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
                                        <NotResult num={songList.length}  />
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
                                        <NotResult num={artists.length}  />
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
                                        <NotResult num={albums.length}  />
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
                                    <NotResult num={videos.length}  />
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
                                    <NotResult num={lyrics.length}  />
                                </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='歌单' key='1000'>
                                <Spin tip="Loading..." spinning={loading}>
                                    <div className="n-srchrst">
                                        <PlayLists list={playLists}  />
                                        <NotResult num={playLists.length}  />
                                    </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='声音主播' key='1009'>
                                <Spin tip="Loading..." spinning={loading}>
                                <div className="ztag j-flag">
                                    <ul className="m-rdilist f-cb">
                                        {
                                            djRadios.map(dj => {
                                                return (
                                                    <DJItem key={dj.id} {...dj} />
                                                )
                                            })
                                        }
                                    </ul>
                                    <NotResult num={djRadios.length}  />
                                </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='用户' key='1002'>
                                <Spin tip="Loading..." spinning={loading}>
                                    <div className="n-srchrst ztag">
                                        <UserPanel list={userprofiles} />
                                        <NotResult num={userprofiles.length}  />
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