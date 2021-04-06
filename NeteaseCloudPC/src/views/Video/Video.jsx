import { Component } from 'react';
import Main from '@/components/Main';
import { Link } from 'react-router-dom';
import videoApi from '@/api/video';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import { CommentWrap } from '@/components/Comment/Comment';
import { message } from 'antd';

class Video extends Component {
    state = {
        videoInfo: {},
        title: '',
        desc: '',
        publishTime: '',
        playTime: '',
        shareCount: '',
        cover: '',
        creator: '',
        hotCmts: [],
        cmtsData: {
            total: 0,
            hotCmts: [],
            cmts: []
        }
    }

    getVideoInfo = async () => {
        const vid = this.props.match.params.id;
        const res = await videoApi.getVideoInfo(vid);
        this.setState({
            title: res.title,
            desc: res.description,
            publishTime: res.publishTime,
            playTime: res.playTime,
            shareCount: res.shareCount,
            cover: res.coverUrl,
            creator: res?.creator?.nickname
        })
        return {
            duration: res.durationms / 1000,
            cover: res.coverUrl,
        }
    }

    getMVInfo = async () => {
        const vid = this.props.match.params.id;
        const res = await videoApi.getMVInfo(vid);
        
        this.setState({
            title: res.name,
            desc: res.desc,
            publishTime: res.publishTime,
            playTime: res.playCount,
            shareCount: res.shareCount,
            cover: res.cover,
            creator: res?.creator?.nickname,
            
        })
        return {
            duration: res.duration / 1000,
            cover: res.cover,
            brs: res.brs
        }
    }

    getVideoUrl = async () => {
        const vid = this.props.match.params.id;
        let res = await videoApi.getVideoUrl(vid);
        return res;
    }

    getMVUrl = async () => {
        const vid = this.props.match.params.id;
        let res = await videoApi.getMVUrl(vid);
        return res;
    }

    getAllMvUrls = async (brs) => {
        if (brs.length === 0) return;
        const vid = this.props.match.params.id;
        let urlArr = [];
        async function getUrl(br) {
            let res = await videoApi.getMVUrl(vid, br);
            return res[0].url;
        }
        brs.map(br => {
            urlArr.push(getUrl(br));
        })
        Promise.all(urlArr).then(res => {
            console.log(res);
            this.setState({
                videoInfo: {
                    ...this.state.videoInfo,
                    urlArr: res
                }
            })
        })
    }

    componentDidMount() {
        document.body.scrollTo(0,0);
        const search = this.props.history.location.search;
        Promise.all(
            [
                search?this.getMVInfo():this.getVideoInfo(), 
                search?this.getMVUrl():this.getVideoUrl()
            ]
        )
        .then(res => {
            let brs = [];
            if (res[0].brs) {
                brs = res[0].brs.map(item => {
                    return item.br;
                })
                brs.sort((a, b) => {
                    return b - a;
                })
                console.log(brs);
            }
            this.getAllMvUrls(brs);
            this.setState({
                videoInfo: {
                    urls: res[1],
                    cover: res[0].cover,
                    duration: res[0].duration,
                    brs
                }
            })
        })
        if (this.props.history.location.search) {
            this.getMvCmts();
        }
    }

    getMvCmts = async (limit = 20, offset = 0) => {
        const vid = this.props.match.params.id;
        const res = await videoApi.getCmts(vid, limit, offset);
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
        this.setState(dataSet)
    }

    changeCmts = async (page, pageSize) => {
        await this.getMvCmts(20, (page - 1) * pageSize);
    }

    render() {
        const { videoInfo, title, creator, publishTime, playTime, desc, cmtsData } = this.state;
        const search = this.props.history.location.search;
        return (
            <Main className="g-bd4">
                <div className="g-mn4">
                    <div className="g-mn4c">
                        <div className="g-wrap6">
                            <div className="n-mv">
                                <div className="title f-cb">
                                    <h2 className="f-ff2 f-thide">
                                        { title }
                                    </h2>
                                    {
                                        search ? null :
                                        <span className="name">
                                            by <Link to="" className="s-fc7">{creator}</Link>
                                        </span>
                                    }
                                </div>
                                <VideoPlayer {...videoInfo} />
                            </div>
                            <CommentWrap 
                                {...cmtsData}
                                onChange={this.changeCmts}
                            />
                        </div>
                    </div>
                    
                </div>
                <div className="g-sd4">
                    <div className="g-wrap7">
                        <h3 className="u-hd3">
                            <span className="f-fl">视频简介</span>
                        </h3>
                        <div className="m-mvintr">
                            <p className="s-fc4">
                                发布时间：{ publishTime }
                            </p>
                            <p className="s-fc4">
                                播放次数：{ playTime }次
                            </p>
                            <p className="intr">
                                { desc }
                            </p>
                        </div>
                    </div>
                </div>
            </Main>
        )
    }
}

export default Video;