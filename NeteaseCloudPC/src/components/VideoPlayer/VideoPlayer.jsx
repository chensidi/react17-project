import { useState, useRef, useReducer, useEffect, } from 'react';
import { mediaTimeFormat } from '@/utils/utils';
import './index.scss';

const brs = {
    '1080': '1080P',
    '720': '超清',
    '480': '高清',
    '240': '标清'
}
const VideoPlayer = (props) => {
    const { urls = [], cover = '', duration = 0, } = props;
    const [playStatus, changeStatus] = useState(false);
    const video = useRef(null);
    const progress = useRef(null);

    useEffect(() => {
        vdoDispatch(actions.setDuration(duration))
    }, [duration])

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
            case 'setDuration': 
                return {
                    ...state,
                    duration: action.time
                }
            case 'updateBuffer':
                return {
                    ...state,
                    buffered: action.buffered
                }
            default:
                return state;
        }
    }
    const initReducer = {
        duration,
        curTime: 0,
        buffer: 100,
        voice: 50,
        pc: '0%',
        buffered: '0%',
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
        },
        setDuration(time) {
            return {
                type: 'setDuration',
                time
            }
        },
        updateBuffer(pc) {
            return {
                type: 'updateBuffer',
                buffered: pc
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
        onProgress();
    }

    function onProgress() {
        try {
            const timeRanges = video.current.buffered;
            const loadProgress = timeRanges.end(timeRanges.length - 1);
            let loadPC = loadProgress / video.current.duration * 100;
            if (loadPC <= 0) {loadPC = 0};
            if (loadPC >= 100) {loadPC = 100};
            vdoDispatch(actions.updateBuffer(loadPC + '%'));
        } catch (err) {
            console.log(err);
        }
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
                        src={urls[0]?.url} 
                        ref={video}
                        onTimeUpdate={timeUpdate}
                        onProgress={onProgress}
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
                                <div className="bridge"></div>
                                <div className="current">
                                    <span className="j-label label">{ brs[urls[0]?.r] }</span>
                                </div>
                                <ul className="j-options options">
                                    {
                                        urls.map(url => {
                                            return (
                                                <li className="itm" key={url.r}>
                                                    <span className="label">
                                                        { brs[url.r] }
                                                    </span>
                                                </li>
                                            )
                                        })
                                    }
                                    <li className="arrow"></li>
                                </ul>
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
                                    <div className="j-out2 out out-2" style={{width: videoDetails.buffered}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer;