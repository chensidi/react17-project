import './index.scss';
import { Link } from 'react-router-dom';
import { useState, createRef, } from 'react';
import { connect } from 'react-redux';
import { mediaTimeFormat, formatLrc, } from '@/utils/utils';
import commonRequest from '@/api/common';
import { setCurSong } from '@/store/action';
import sessionStore from '@/utils/sessionStore';

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        curSong: state.globalData?.curSong || sessionStore.get('globalData').curSong
    }
}

const mapDispatchToprops = (dispatch) => {
    return {
        setCurSong: (song) => dispatch(setCurSong(song))
    }
}

const PlayBar = (props) => {
    const [downUpKey, changeDownUp] = useState(false); //控制能否拖动的开关
    const barRef = createRef(null); //进度条ref
    const mp3 = createRef(null); //音频ref
    const [mp3Info, changeMp3Info] = useState({
        isPlay: false, //播放状态play/pause
        duration: 0,
        currentTime: 0,
        loadPC: 0, //加载进度
        progress: 0, //播放进度，0-100
        lyric: [], //歌词数组
        curIdx: 0, //当前歌词下标
    }); // 音频信息
    const [lock, changeLock] = useState(false); //playbar是否锁定，默认不锁定
    const [isEnter, changeEnter] = useState(false); //是否鼠标亦如playbar
    const [curIdx, changeCurIdx] = useState(0);
    let timer = null;
    // 没有歌曲的话，默认设置为张学友 - 咖啡
    if (props.curSong == null) {
        commonRequest.getSongUrl(188261).then(url => {
            commonRequest.getLyric(188261).then(res => {
                props.setCurSong({
                    url,
                    name: '咖啡',
                    singer: '张学友',
                    lyc: res
                })
            })
        })
    }

    function barOnMouseDown(e) { //进度条按钮按下 
        changeDownUp(true);
    }
    function barOnMouseUp(e) { //进度条按钮松开
        changeDownUp(false);
        mp3.current.currentTime = mp3Info.progress / 100 * mp3Info.duration;
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
        // changeProgress(curProgress);
        changeMp3Info({
            ...mp3Info,
            progress: curProgress
        })
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
        onLoadSrc();
        lrcWithPlay();
        if (downUpKey) return;
        const curTime = mp3.current.currentTime,
              duration = mp3Info.duration;
        const curProgress = (curTime / duration) * 100;
        // changeProgress(curProgress);
        changeMp3Info({
            ...mp3Info,
            currentTime: curTime,
            progress: curProgress,
        })
    }
    function lrcWithPlay() { //歌词同步
        if (!props.curSong?.lyc) return;
        const lrc = formatLrc(props.curSong?.lyc || '');
        for(let i = 0; i < lrc.length - 1; i ++) {
            const curTime = mp3.current.currentTime,
                  item = lrc[i],
                  nextItem = lrc[i + 1];
            if (curTime >= item.time && curTime < nextItem.time) {
                changeCurIdx(i);
                const curP = document.querySelectorAll('p.j-flag')[i];
                curP.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
                break;
            }
        }
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
        let loadPC = loadProgress / mp3Info.duration * 100;
        if (loadPC <= 0) {loadPC = 0};
        if (loadPC >= 100) {loadPC = 100};
        changeMp3Info({
            ...mp3Info,
            loadPC,
        })
    }
    function onEnd() { //播放结束
        changeMp3Info({
            ...mp3Info,
            isPlay: false,
            currentTime: 0,
            progress: 0
        })
    }
    function lockBar() { //锁定playbar
        changeLock(!lock);
    }
    function mouseOutBar() { //鼠标离开playbar
        if (lock) return;
        timer = setTimeout(() => changeEnter(false), 500);
    }
    function mouseEnterBar() { //鼠标进入playbar
        clearTimeout(timer);
        timer = null;
        if (lock) return;
        changeEnter(true);
    }
    return (
        <div className="g-btmbar" 
        >
            <div 
                className={['m-playbar', lock ? 'm-playbar-lock' : 'm-playbar-unlock'].join(' ')} 
                style={{top: lock ? '-53px' : (isEnter ? '-53px' : '-7px')}}
                onMouseEnter={mouseEnterBar}
                onMouseLeave={mouseOutBar}
            >
                <div className="updn">
                    <div className="left f-fl">
                        <span className="btn" onClick={lockBar}></span>
                    </div>
                    <div className="right f-fl"></div>
                </div>
                <div className="bg"></div>
                <div className="hand" title="展开播放条" 
                ></div>
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
                            <span className="f-thide name fc1 f-fl" title={props?.curSong?.name}>
                            {props?.curSong?.name}
                            </span>
                            <em className="mv f-fl"></em>
                            <span className="by f-thide f-fl">
                                <span className={props?.curSong?.singer}>
                                    <Link to="">{props?.curSong?.singer}</Link>
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
                                <div className="cur" style={{width: `${mp3Info.progress}%`}}>
                                    <span className="btn f-tdn f-alpha" 
                                        onMouseDown={barOnMouseDown}
                                        onMouseUp={barOnMouseUp}
                                    >
                                        <i></i>
                                    </span>
                                </div>
                            </div>
                            <div className="j-flag time">
                                <time>{mediaTimeFormat(mp3Info.currentTime)}</time>
                                /
                                <time>{mediaTimeFormat(mp3Info.duration)}</time>
                            </div>
                        </div>
                    </div>
                    <div className="ctrl f-fl f-pr j-flag">
                        <span className="add f-pr">
                            <em className="icn icn-list s-fc3" title="播放列表">1</em>
                        </span>
                    </div>
                </div>
                <div className="list">
                    <div className="listhd">
                        <div className="listhdc">
                            <h4>播放列表(<span className="j-flag">1</span>)</h4>
                            <span className="addall">
                                <i className="ico ico-add"></i>
                                收藏全部
                            </span>
                            <span className="line"></span>
                            <span className="clear">
                                <i className='ico icn-del'></i>
                                清除
                            </span>
                            <div className="lytit f-ff0 f-thide j-flag">咖啡</div>
                            <span className="close">关闭</span>
                        </div>
                    </div>
                    <div className="listbd">
                        <div className="msk2"></div>
                        <div className="listlyric j-flag">
                            {
                                formatLrc(props.curSong?.lyc||'').map((item, i) => {
                                    return (
                                        <p className={['j-flag', i == curIdx ? 'z-sel' :''].join(' ')} key={item.time}>{ item.txt }</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <audio 
                ref={mp3} 
                preload="true" 
                onLoadedMetadata={onMp3Load} 
                src={props.curSong?.url} 
                onTimeUpdate={onPlaying}
                onProgress={onLoadSrc}
                onEnded={onEnd}
            >
            </audio>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToprops)(PlayBar);