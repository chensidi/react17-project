import { useState, useRef, useReducer, useEffect, } from 'react';
import Fullscreen from 'fullscreen-react';

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
    const [isEnter, setIsEnter] = useState(false);
    const video = useRef(null);
    const progress = useRef(null);
    const vdo = useRef();
    const [timeTip, changeTimeTip] = useState({show: false, left: 0, txt: '', subLeft: 0});

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
            case 'setLoading':
                return {
                    ...state,
                    loading: action.loading
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
        loading: true
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
        },
        setLoading(loading) {
            return {
                type: 'setLoading',
                loading
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

    function getCommonRect(ev, flag = true) {
        const { width, left } = progress.current.getBoundingClientRect();
        let curWidth = ev.clientX - left; //实际宽度
        let curProgress = curWidth / width * 100;
        flag && (curProgress = Math.round(curProgress));
        if (curProgress <= 0) {
            curProgress = 0;
        }
        if (curProgress >= 100) {
            curProgress = 100;
        }
        return {curWidth, curProgress, width}
    }

    function jump(e) { //点击指定播放位置
        const { curProgress } = getCommonRect(e);
        vdoDispatch(actions.updatePc(curProgress + '%'));
        const time = videoDetails.duration * curProgress / 100;
        video.current.currentTime = time;
        vdoDispatch(actions.updateTime(time));
        video.current.play();
        changeStatus(true);
    }

    function moveHandler(e) { //在播放条上移动
        let { curWidth, curProgress, width } = getCommonRect(e, false);
        let subLeft = 0;
        if (curWidth <= 21) {
            subLeft = curWidth - 21 < -14 ? -14 : curWidth - 21;
            curWidth = 21;
        }
        if (curWidth >= width - 21) {
            subLeft = 21 - (width - curWidth) > 14 ? 14 : 21 - (width - curWidth);
            curWidth = width - 21;
        }
        changeTimeTip({
            show: true,
            left: curWidth - 21,
            txt: mediaTimeFormat(curProgress * duration / 100),
            subLeft
        });
    }

    function readyPlay() { //准备就绪
        setTimeout(() => {
            vdoDispatch(actions.setLoading(false));
            video.current.play();
            changeStatus(true);
        }, 1000)
    }

    return (
        <Fullscreen isEnter={isEnter} onChange={setIsEnter}>
        <div className="vdo-player" ref={vdo}>
            <div className={`m-ctvideo z-active ${playStatus?'z-play':'z-pause'}`}>
                <div className="player">
                    <video className="media" 
                        src={urls[0]?.url} 
                        ref={video}
                        onTimeUpdate={timeUpdate}
                        onProgress={onProgress}
                        onCanPlayThrough={readyPlay}
                        onLoadedData={() => console.log('loadedDataa')}
                    >
                    </video>
                    <div className="poster ffull" style={{display: videoDetails.loading?'':'none'}}>
                        <img className="j-pic pic" src={cover} alt=""/>
                    </div>
                    <div className="play ffull"  
                    onClick={playHandler}>
                        {
                            videoDetails.loading ? null : <i className="icn"></i>
                        }
                    </div>
                    <span className="loading" style={{display: videoDetails.loading?'':'none'}}></span>
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
                            <i className="full ffr" onClick={() => setIsEnter(prev => !prev)}></i>
                        </div>
                        <div className="foh">
                            <div className="j-left left">
                                <span className="time">{ mediaTimeFormat(videoDetails.curTime) }</span>
                                <i className="play ffl" onClick={playHandler}></i>
                            </div>
                            <div className="j-progress progresswrap">
                                <div className="progress progress-2" 
                                    onClick={jump} 
                                    ref={progress}
                                    onMouseMove={moveHandler}
                                >
                                    <div className="j-ht" style={{left: timeTip.left}}>
                                        <span className="hovertime">{ timeTip.txt }</span>
                                        <span className="arrow" style={{left: timeTip.subLeft}}></span>
                                    </div>
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
        </Fullscreen>
    )
}

export default VideoPlayer;