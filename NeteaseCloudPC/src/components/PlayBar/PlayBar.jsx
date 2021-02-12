import './index.scss';
import { Link } from 'react-router-dom';
import { useState, createRef, } from 'react';
import { connect } from 'react-redux';
import { mediaTimeFormat } from '@/utils/utils';

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        curSong: state.globalData.curSong
    }
}

const PlayBar = (props) => {
    const [progress, changeProgress] = useState(0); //播放进度，0-100
    const [downUpKey, changeDownUp] = useState(false); //控制能否拖动的开关
    const barRef = createRef(null); //进度条ref
    const mp3 = createRef(null); //音频ref
    const [mp3Info, changeMp3Info] = useState({
        url: "http://m7.music.126.net/20210212222708/2af1a77067324cefe8fa2b0b294d079e/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3036222985/f34b/cf39/4009/f9f78b87e872c3105830ca640a32cb25.mp3",
        name: '咖啡',
        singer: '张学友',
        isPlay: false, //播放状态play/pause
        duration: 0,
        loadPC: 0, //加载进度
    }); // 音频信息

    function barOnMouseDown(e) { //进度条按钮按下 
        changeDownUp(true);
    }
    function barOnMouseUp(e) { //进度条按钮松开
        changeDownUp(false);
        mp3.current.currentTime = progress / 100 * mp3Info.duration;
        mp3.current.play();
        changeMp3Info({
            ...mp3Info,
            isPlay: true
        })
    }
    function barOnMoveAndClick(needKey, e) { //进度条拖动和点击位置
        if (needKey && !downUpKey) { //拖动的时候需要考虑开关，点击不需要
            return;
        }
        const {width, left} = barRef.current.getBoundingClientRect();
        let curWidth = e.clientX - left; //实际宽度
        let curProgress = Math.round(curWidth / width * 100);
        if (curProgress <= 0) {
            curProgress = 0;
        }
        if (curProgress >= 100) {
            curProgress = 100;
        }
        changeProgress(curProgress);
        if (!needKey) {
            mp3.current.currentTime = curProgress / 100 * mp3Info.duration;
            mp3.current.play();
            changeMp3Info({
                ...mp3Info,
                isPlay: true
            })
        }
    }
    function playPause() { //播放暂停
        if (mp3Info.isPlay) {
            mp3.current.pause(); 
        } else {
            mp3.current.play();
        }
        changeMp3Info({
            ...mp3Info,
            isPlay: !mp3Info.isPlay
        })
    }
    function onPlaying() { //播放中
        if (downUpKey) return;
        const curTime = mp3.current.currentTime,
              duration = mp3Info.duration;
        const curProgress = (curTime / duration) * 100;
        changeProgress(curProgress);
        // onLoadSrc();
    }
    function onMp3Load() { //加载完头信息
        changeMp3Info({
            ...mp3Info,
            duration: mp3.current.duration
        })
    }
    function onLoadSrc() { //音频加载资源时
        const timeRanges = mp3.current.buffered;
        const loadProgress = timeRanges.end(timeRanges.length - 1);
        console.log(loadProgress);
        let loadPC = loadProgress / mp3Info.duration * 100;
        if (loadPC <= 0) {loadPC = 0};
        if (loadPC >= 100) {loadPC = 100};
        changeMp3Info({
            ...mp3Info,
            loadPC,
        })
    }
    return (
        <div className="g-btmbar">
            <div className="m-playbar m-playbar-lock">
                <div className="updn">
                    <div className="left f-fl">
                        <span className="btn"></span>
                    </div>
                    <div className="right f-fl"></div>
                </div>
                <div className="bg"></div>
                <div className="hand" title="展开播放条"></div>
                <div className="wrap">
                    <div className="btns">
                        <span className="prv" title="上一首(ctrl+←)"></span>
                        <span className={['j-flag', mp3Info.isPlay?'pas':'ply'].join(' ')} title="播放/暂停(p)" onClick={playPause}></span>
                        <span className="nxt" title="下一首(ctrl+→)"></span>
                    </div>
                    <div className="head j-flag">
                        <img src="https://p1.music.126.net/lFSv32MTTbVa8r6D3zuYrw==/64871186055033.jpg?param=34y34" alt=""/>
                    </div>
                    <div className="play">
                        <div className="j-flag words">
                            <span className="f-thide name fc1 f-fl" title="咖啡">
                            咖啡
                            </span>
                            <em className="mv f-fl"></em>
                            <span className="by f-thide f-fl">
                                <span className="张学友">
                                    <Link to="">张学友</Link>
                                </span>
                            </span>
                        </div>
                        <div className="m-pbar">
                            <div className="barbg j-flag" 
                                onMouseMove={(e) => barOnMoveAndClick(true, e)}
                                onClick={(e) => barOnMoveAndClick(false, e)}
                                ref={barRef}
                            >
                                <div className="rdy" style={{width: `${mp3Info.loadPC}%`}}></div>
                                <div className="cur" style={{width: `${progress}%`}}>
                                    <span className="btn f-tdn f-alpha" 
                                        onMouseDown={barOnMouseDown}
                                        onMouseUp={barOnMouseUp}
                                    >
                                        <i></i>
                                    </span>
                                </div>
                            </div>
                            <div className="j-flag time">
                                <time>{mediaTimeFormat(mp3?.current?.currentTime || 0)}</time>
                                /
                                <time>{mediaTimeFormat(mp3Info.duration)}</time>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <audio 
                ref={mp3} 
                preload="true" 
                onLoadedMetadata={onMp3Load} 
                src={mp3Info.url} 
                onTimeUpdate={onPlaying}
                onProgress={onLoadSrc}
            >
            </audio>
        </div>
    )
}

export default connect(mapStateToProps)(PlayBar);