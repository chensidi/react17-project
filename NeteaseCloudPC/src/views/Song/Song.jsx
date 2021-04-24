import { Component } from 'react';
import Main from '@/components/Main';
import { Link } from 'react-router-dom';
import commonApi from '@/api/common';
import { artistsFormat, lrcFilter, playItem } from '@/utils/utils';
import { CommentWrap } from '@/components/Comment/Comment';
import { SameLists, SameSongs } from './components';
import { addToPlay } from '@/utils/utils';
import BtnTools from '@/components/Common/BtnTools';

class Song extends Component {
    state = {
        id: '',
        songInfo: {},
        lrcArr: [],
        lrcObj: {
            lrcArr: [],
            lrcUser: {}
        },
        openLrc: false,
        hotCmts: [],
        cmts: [],
        cmtsTotal: 0,
        curPage: 1,
        sameLists: [],
        sameSongs: [],
        cmtsData: {
            hotCmts: [],
            cmts: [],
            total: 0
        }
    }

    getSongDetails = async (id) => {
        const res = await commonApi.getSongDetails(id);
        const songInfo = {
            name: res.name,
            album: res.al,
            artists: res.ar,
            mv: res.mv
        }
        this.setState({songInfo})
    }

    getLrc = async (id) => {
        const res = await commonApi.getLyric(id, true);
        const lrcObj = {
            lrcArr: lrcFilter(res?.lrc?.lyric || ''),
            lrcUser: res.lyricUser
        }
        this.setState({lrcObj});
    }

    getCmt = async (id, limit = 20, offset = 0) => {
        const res = await commonApi.getCmtOfSong({
            id,
            limit,
            offset
        })
        let dataSet = offset > 0 ? {
            cmtsData: {
                ...this.state.cmtsData,
                cmts: res.comments
            }
        } : {
            cmtsData: {
                total: res.total,
                hotCmts: res.hotComments,
                cmts: res.comments
            }
        }
        this.setState(dataSet);
    }

    _getSameLists = async (id) => {
        const sameLists = await commonApi.getSameList(id);
        this.setState({sameLists});
    }

    _getSameSongs = async (id) => {
        const sameSongs = await commonApi.getSameSong(id);
        this.setState({sameSongs});
    }

    pageChange = async (page, pageSize) => {
        await this.getCmt(this.state.id, 20, (page - 1) * pageSize)
    }

    init = (id) => {
        this.setState({id});
        this.getSongDetails(id);
        this.getLrc(id);
        this.getCmt(id);
        this._getSameLists(id);
        this._getSameSongs(id);
        document.body.scrollTo(0, 0);
    }

    componentDidMount() {
        const id = this.props.match.params?.id;
        this.init(id);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.id !== this.state.id) {
            console.log('refresh');
            // console.log(this.props.match.params.id, newProps.match.params.id)
            this.init(newProps.match.params.id);
        }
    }

    render() {
        const {
            songInfo,
            lrcObj, 
            openLrc,
            sameLists,
            sameSongs,
            id,
            cmtsData
        } = this.state;
        const sid = songInfo?.artists && songInfo?.artists[0]?.id;
        return (
            <div>
                <Main className="g-bd4">
                    <div className="g-mn4">
                        <div className="g-mn4c">
                            <div className="g-wrap6">
                                <div className="m-lycifo">
                                    <div className="f-cb">
                                        <div className="cvrwrap f-cb f-pr">
                                            <div className="u-cover u-cover-6 f-fl">
                                                <img src={songInfo?.album?.picUrl} alt=""/>
                                                <span className="msk f-alpha"></span>
                                            </div>
                                            <div className="out s-fc3">
                                                <i className="u-icn u-icn-95 f-fl"></i>
                                                <Link to="" className="des s-fc7">生成外链播放器</Link>
                                            </div>
                                        </div>
                                        <div className="cnt">
                                            <div className="hd">
                                                <i className="lab u-icn u-icn-37"></i>
                                                <div className="tit">
                                                    <em className="f-ff2">{ songInfo?.name }</em>
                                                </div>
                                            </div>
                                            <p className="des s-fc4">
                                                歌手：
                                                <span title={artistsFormat(songInfo?.artists || [])}>
                                                    <Link to={`/singer/${sid}`} className="des s-fc7">{ artistsFormat(songInfo?.artists || []) }</Link>
                                                </span>
                                            </p>
                                            <p className="des s-fc4">
                                                所属专辑：
                                                <span title={songInfo?.album?.name}>
                                                    <Link to={`/album/${songInfo?.album?.id}`} className="des s-fc7">{ songInfo?.album?.name }</Link>
                                                </span>
                                            </p>
                                            <BtnTools 
                                                commentCount={cmtsData.total} 
                                                playHandler={() => playItem(id)} 
                                                addHandler={() => addToPlay(id)}
                                            />
                                            <div className="bd bd-open f-brk f-ib">
                                                {
                                                    lrcObj.lrcArr.slice(0, openLrc?-1:10).map((lrc, i) => {
                                                        return (
                                                            <p key={`${lrc}-${i}`}>{ lrc }</p>
                                                        )
                                                    })
                                                }
                                                <div className="crl">
                                                    <span className="s-fc7" onClick={() => this.setState({openLrc: !openLrc})}>
                                                        展开
                                                        <i className={`u-icn ${!openLrc?'u-icn-69':'u-icn-70'}`}></i>
                                                    </span>
                                                </div>
                                                {
                                                    lrcObj.lrcUser?.nickname ? 
                                                    <div className="lrc-user">
                                                        <p className="s-fc3">
                                                        贡献歌词：<Link to="" className="f-tdu s-fc7">{ lrcObj.lrcUser?.nickname }</Link>
                                                        </p>
                                                    </div> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CommentWrap 
                                    onChange={this.pageChange}
                                    {...cmtsData}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="g-sd4">
                        <div className="g-wrap7">
                            <SameLists lists={sameLists} />
                            <SameSongs songs={sameSongs} />
                        </div>
                    </div>                                    
                </Main>
            </div>
        )
    }
}

export default Song;