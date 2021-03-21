import { Component } from 'react';
import Main from '@/components/Main';
import { Link } from 'react-router-dom';
import commonApi from '@/api/common';
import { artistsFormat, lrcFilter, playItem } from '@/utils/utils';
import { Pagination, message } from 'antd';
import Comment from '@/components/Comment/Comment';

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
        curPage: 1
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
            lrcArr: lrcFilter(res.lrc.lyric),
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
            cmts: res.comments,
            cmtsTotal: res.total
        } : {
            hotCmts: res.hotComments,
            cmts: res.comments,
            cmtsTotal: res.total
        }
        this.setState(dataSet);
    }

    pageChange = async (page, pageSize) => {
        this.setState({curPage: page});
        message.loading({ 
            content: '获取评论中...', 
            key: 'loadCmt', 
            duration: 0 ,
            style: {
                marginTop: '40vh',
            },
        });
        await this.getCmt(this.state.id, 20, (page - 1) * pageSize)
        message.destroy('loadCmt')
    }

    componentDidMount() {
        const id = this.props.match.params?.id;
        this.setState({id});
        this.getSongDetails(id);
        this.getLrc(id);
        this.getCmt(id);
    }

    render() {
        const {
            songInfo,
            lrcObj, 
            openLrc,
            hotCmts,
            cmts,
            cmtsTotal,
            curPage,
            id
        } = this.state;
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
                                                <span title="张学友">
                                                    <Link to="" className="des s-fc7">{ artistsFormat(songInfo?.artists || []) }</Link>
                                                </span>
                                            </p>
                                            <p className="des s-fc4">
                                                所属专辑：
                                                <span title="情缘十载">
                                                    <Link to="" className="des s-fc7">{ songInfo?.album?.name }</Link>
                                                </span>
                                            </p>
                                            <div className="m-info">
                                                <div className="btns f-cb">
                                                    <div className="u-btn2 u-btn2-2 u-btni-addply f-fl" onClick={() => playItem(id)}>
                                                        <i>
                                                            <em className="ply"></em>
                                                            播放
                                                        </i>
                                                    </div>
                                                    <div className="u-btni u-btni-add"></div>
                                                    <div className="u-btni u-btni-fav">
                                                        <i>收藏</i>
                                                    </div>
                                                    <div className="u-btni u-btni-share">
                                                        <i>分享</i>
                                                    </div>
                                                    <div className="u-btni u-btni-dl">
                                                        <i>下载</i>
                                                    </div>
                                                    <div className="u-btni u-btni-cmmt">
                                                        <i>评论(120)</i>
                                                    </div>
                                                </div>
                                            </div>
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
                                <div className="n-cmt">
                                    <div>
                                        <div className="u-title u-title-1">
                                            <h3>
                                                <span className="f-ff2">
                                                评论
                                                </span>
                                            </h3>
                                            <span className="sub s-fc3">共{ cmtsTotal }条评论</span>
                                        </div>
                                        <div className="m-cmmt">
                                            <div className="cmmts j-flag">
                                                {
                                                    hotCmts.length ? 
                                                    <div className="u-hd4">
                                                        精彩评论
                                                    </div> : null
                                                }
                                                {
                                                    hotCmts.map(cmt => {
                                                        return (
                                                            <Comment key={cmt.commentId} {...cmt} />
                                                        )
                                                    })
                                                }
                                                <br/><br/>
                                                <div className="u-hd4">
                                                    最新评论
                                                </div>
                                                {
                                                    cmts.map(cmt => {
                                                        return (
                                                            <Comment key={cmt.commentId} {...cmt} />
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="pagination-wrap">
                                                <Pagination 
                                                    defaultCurrent={1} 
                                                    total={cmtsTotal} 
                                                    pageSize={20} 
                                                    showSizeChanger={false}
                                                    onChange={this.pageChange}
                                                    current={curPage}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Main>
            </div>
        )
    }
}

export default Song;