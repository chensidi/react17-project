import { Component } from 'react';
import Main from '@/components/Main';
import { Link } from 'react-router-dom';
import videoApi from '@/api/video';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

class Video extends Component {
    state = {
        videoInfo: {},
        title: '',
        desc: '',
        publishTime: '',
        playTime: '',
        shareCount: '',
        cover: '',
        creator: ''
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
            creator: res.creator.nickname
        })
        return {
            duration: res.durationms / 1000,
            cover: res.coverUrl,
        }
    }

    getVideoUrl = async () => {
        const vid = this.props.match.params.id;
        const res = await videoApi.getVideoUrl(vid);
        return res;
    }

    componentDidMount() {
        Promise.all([this.getVideoInfo(), this.getVideoUrl()])
        .then(res => {
            console.log(res);
            this.setState({
                videoInfo: {
                    urls: res[1],
                    cover: res[0].cover,
                    duration: res[0].duration
                }
            })
        })
        
    }

    render() {
        const { videoInfo, title, creator } = this.state;
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
                                    <span className="name">
                                        by <Link to="" className="s-fc7">{creator}</Link>
                                    </span>
                                </div>
                                <VideoPlayer {...videoInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        )
    }
}

export default Video;