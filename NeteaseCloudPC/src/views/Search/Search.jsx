import { Component, Fragment, } from 'react';
import { Tabs, Spin, Pagination, } from 'antd';
import { searchApi } from '@/api/search';
import { setSubNav } from '@/store/action';
import Main from '@/components/Main';
import { connect } from 'react-redux';
import { SongItem, SingerItem, AlbumItem, VideoItem, LrcItem, PlayLists, DJItem, UserPanel, NotResult, } from './components';
import { setSearchTab, setSearchPage } from '@/store/action';

const { TabPane } = Tabs;

const mapStateTopProps = (state) => {
    return {
        tabType: state.globalData.searchTab,
        searchPage: state.globalData.searchPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTab: tab => dispatch(setSearchTab(tab)),
        setSearchPage: page => dispatch(setSearchPage(page)),
        setSubNav: show => dispatch(setSubNav(show))
    }
}

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
        unit: '首',
        total: 0,
        curPage: this.props.searchPage
    }
    componentDidMount() {
        this.props.setSubNav(false);
        let kw = this.props.match.params.kw;
        kw = decodeURIComponent(kw);
        setTimeout(() => {this.searchInput.value = kw;}, 100)
        this.search(kw, this.props.tabType ?? '1', 30, (this.props.searchPage - 1) * 30);
        this.setState({
            kw,
            curType: this.props.tabType ?? '1'
        });
    }
    callback = (key) => {
        // this.searchInput.value = this.state.kw;
        this.setState({
            curType: key,
            curPage: 1
        })
        this.props.setTab(key);
        this.props.setSearchPage(1);
        this.search(this.state.kw, key);
    }

    search = (kw, type, limit, offset) => { //搜索
        this.setState({loading: true});
        searchApi.searchByKw(kw, type, limit, offset).then(res => {
            let target, data, unit, total = 0;
            switch (type) {
                case '1': 
                    target = 'songList';
                    data = res?.songs || [];
                    unit = '首';
                    total = res.songCount;
                    break;
                case '10':
                    target = 'albums';
                    data = res?.albums || [];
                    unit = '张';
                    total = res.albumCount;
                    break;
                case '100':
                    target = 'artists';
                    data = res?.artists || [];
                    unit = '位';
                    total = res.artistCount;
                    break;
                case '1014':
                    target = 'videos';
                    data = res?.videos || [];
                    unit = '个';
                    total = res.videoCount;
                    break;
                case '1006':
                    target = 'lyrics';
                    data = res?.songs || [];
                    unit = '个';
                    total = res.songCount;
                    break;
                case '1000':
                    target = 'playLists';
                    data = res?.playlists || [];
                    unit = '个';
                    total = res.playlistCount;
                    break;
                case '1009':
                    target = 'djRadios';
                    data = res?.djRadios || [];
                    unit = '位';
                    total = res.djRadiosCount;
                    break;
                case '1002':
                    target = 'userprofiles';
                    data = res?.userprofiles || [];
                    unit = '位';
                    total = res.userprofileCount;
                    break;
            }
            if (data) {
                setTimeout(() => {
                    this.setState({loading: false})
                }, 500)
                this.setState({
                    [target]: data, 
                    curNum: data.length,
                    unit,
                    total
                })
            }
        })
    }

    searchHandler = (e) => {
        if (e.code === 'Enter' && e.target.value !== '') {
            this.props.history.replace(`/search/${e.target.value}`)
            // this.search(e.target.value, this.state.curType);
            this.setState({curPage: 1});
            this.props.setSearchPage(1);
        }
    }

    changeHandler = (e) => {
        if (e.target.value) {
            this.setState({kw: e.target.value});
        }
    }

    pageChange = (page, pageSize) => {
        this.setState({
            curPage: page
        })
        this.props.setSearchPage(page);
        this.search(this.state.kw, this.state.curType, pageSize, (page - 1) * pageSize)
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
            unit,
            total,
            curPage
        } = this.state;
        const { tabType } = this.props;
        const kw = this.searchInput?.value || this.state.kw;
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
                        搜索“{kw}”，找到 <em className="s-fc6">{ total }</em> { unit }{ tabs[curType] }
                        </div>
                        <Tabs className="my-tabs" onChange={this.callback} type="card" defaultActiveKey={tabType}>
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
                                        <NotResult num={songList.length} loading={loading}  />
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
                                        <NotResult num={artists.length} loading={loading}  />
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
                                        <NotResult num={albums.length} loading={loading}  />
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
                                    <NotResult num={videos.length} loading={loading}  />
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
                                    <NotResult num={lyrics.length} loading={loading}  />
                                </div>
                                </Spin>
                            </TabPane>
                            <TabPane tab='歌单' key='1000'>
                                <Spin tip="Loading..." spinning={loading}>
                                    <div className="n-srchrst">
                                        <PlayLists list={playLists}  />
                                        <NotResult num={playLists.length} loading={loading}  />
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
                                    <NotResult num={djRadios.length} loading={loading}  />
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
                        {
                            total >= 30 ?
                            <div className="search-pagination">
                                <Pagination 
                                    current={curPage}
                                    total={total} 
                                    showSizeChanger={false}
                                    onChange={this.pageChange}
                                    pageSize={30}
                                />
                            </div>: null
                        }
                    </section>
                </div>
            </Main>
        )
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(SearchPage);