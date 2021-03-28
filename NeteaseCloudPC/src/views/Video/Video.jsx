import { Component, useState, useRef, useReducer } from 'react';
import Main from '@/components/Main';
import { Link } from 'react-router-dom';
import { mediaTimeFormat } from '@/utils/utils';


const VideoPlayer = (props) => {
    const { url, cover } = props;
    const [playStatus, changeStatus] = useState(false);
    const video = useRef(null);
    const progress = useRef(null);

    function vdoReducer(state, action) {
        switch (action.type) {
            case 'updateTime':
                return {
                    ...state,
                    curTime: action.time
                }
            case 'updatePc':
                return {
                    ...state,
                    pc: action.pc
                }
            default:
                return state;
        }
    }
    const initReducer = {
        duration: 320,
        curTime: 0,
        buffer: 100,
        voice: 50,
        pc: '0%'
    }

    const actions = {
        updateTime(time) {
            return {
                type: 'updateTime',
                time
            }
        },
        updatePc(pc) {
            return {
                type: 'updatePc',
                pc
            }
        }
    }

    const [videoDetails, vdoDispatch] = useReducer(vdoReducer, initReducer);

    function playHandler() { //播放控制
        if (video.current.paused) {
            video.current.play();
            changeStatus(true);
        } else {
            video.current.pause();
            changeStatus(false);
        }
    }

    function timeUpdate() { //播放中更新
        //更新当前时间
        const time = video.current.currentTime;
        vdoDispatch(actions.updateTime(time));
        //更新进度
        const pc = time / videoDetails.duration * 100 + '%';
        vdoDispatch(actions.updatePc(pc));
    }

    function jump(e) { //点击指定播放位置
        console.log(e);
        const { width, left } = progress.current.getBoundingClientRect();
        let curWidth = e.clientX - left; //实际宽度
        let curProgress = Math.round(curWidth / width * 100);
        if (curProgress <= 0) {
            curProgress = 0;
        }
        if (curProgress >= 100) {
            curProgress = 100;
        }
        console.log(curProgress);
        vdoDispatch(actions.updatePc(curProgress + '%'));
        const time = videoDetails.duration * curProgress / 100;
        video.current.currentTime = time;
        vdoDispatch(actions.updateTime(time));
    }

    return (
        <div className="vdo-player">
            <div className={`m-ctvideo z-active ${playStatus?'z-play':'z-pause'}`}>
                <div className="player">
                    <video className="media" 
                        src={url} 
                        ref={video}
                        onTimeUpdate={timeUpdate}
                    >
                    </video>
                    <div className="poster ffull">
                        <img className="j-pic pic" src={cover} alt=""/>
                    </div>
                    <div className="play ffull" onClick={playHandler}>
                        <i className="icn"></i>
                    </div>
                    <span className="loading"></span>
                </div>
                <div className="controls">
                    <div className="wrap">
                        <div className="j-right right">
                            <div className="duration ffl">{ mediaTimeFormat(videoDetails.duration) }</div>
                            <div className="volume ffl">
                                <span className="j-mute mute"></span>
                            </div>
                            <div className="brs ffl">
                                <div className="current">
                                    <span className="j-label label">标 清</span>
                                </div>
                            </div>
                            <i className="full ffr"></i>
                        </div>
                        <div className="foh">
                            <div className="j-left left">
                                <span className="time">{ mediaTimeFormat(videoDetails.curTime) }</span>
                                <i className="play ffl" onClick={playHandler}></i>
                            </div>
                            <div className="j-progress progresswrap">
                                <div className="progress progress-2" onClick={jump} ref={progress}>
                                    <div className="j-out1 out out-1" style={{width: videoDetails.pc}}>
                                        <div className="in">
                                            <div className="dot"></div>
                                        </div>
                                    </div>
                                    <div className="j-out2 out out-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const videoInfo = {
    url: 'https://vodkgeyttp9c.vod.126.net/vodkgeyttp8/oAeVWQUJ_2156888207_sd.mp4?ts=1616939813&rid=47115DC667964F5C42BDE925D7219E80&rl=3&rs=zivOatqdyVneLFWzMQACIGZaHhqhvvAb&sign=dc286eb776095014b1d3f7612a3fe2a2&ext=NnR5gMvHcZNcbCz592mDGeZTSBHyDwLSnDKYBiagjXqeLvOhUa5bvP01NAOnvrInYZW4FdQGmXKFb0WrQg527b%2B1gv50R3b38Besi9qFz6Tc4Q%2F2kqtvphfE3uarM5VSmn2tFnLSLfYDo0TNsHM5kl9XYDTPKQ9hHJ0DIbXbuNlMYt4kuqkXPdlzHRWY%2F766B8f7UJ7KLFLnepgRgx99AMjglXx3zgtvIynZqOOE3%2BmsuA4465phO2DcdFyqmnRp1vhVMv1kpwrzDKLq2ASJqbPdz7qmI1QOBBU4pc35S5JSc9VnV2DEAV4lBK3O%2BGtAjvO0PRVBIAmoxXT3wt%2FUECReMjinRwyMx2fcv7uH9PcopKam%2FnbdUNQxHmChBl4k0lm97hH8Q8jEBUL5vqujpWdUu0GBnD%2BK8WvhAuJ4h3PBRkCG%2BVIOtHvtofk9FrKxvRI6SVgkwsoYaetz1lP0YKBojT7sM0cQkWQbosYbxbFd7qnT2kbUG7rtM7Mq5CgJOUcAuv7sk%2BkKT0JtC%2B0opez9Q6A6ZzOz%2Bk0ArJ27BYrSCnYSz6TzuscYGN3tQ5o5',
    cover: 'http://p1.music.126.net/TuH23VLqa2POC9xjDazVAg==/109951163696772077.jpg?imageView&quality=75'
}

class Video extends Component {
    render() {
        return (
            <Main className="g-bd4">
                <div className="g-mn4">
                    <div className="g-mn4c">
                        <div className="g-wrap6">
                            <div className="n-mv">
                                <div className="title f-cb">
                                    <h2 className="f-ff2 f-thide">
                                        张学友音乐之旅演唱会 -《情网》
                                    </h2>
                                    <span className="name">
                                        by <Link to="" className="s-fc7">经典演唱会一网打尽By黄较瘦</Link>
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