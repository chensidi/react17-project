import './index.scss';
import { Link } from 'react-router-dom';
import { useState, createRef, memo, useEffect, useRef, forwardRef, } from 'react';
import { connect } from 'react-redux';
import { mediaTimeFormat, formatLrc, artistsFormat, delFromPlay, getRandom, clearHistory } from '@/utils/utils';
import commonRequest from '@/api/common';
import { setCurSong, setHistory, setLock, } from '@/store/action';
 
const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        curSong: state.globalData?.curSong,
        historyPlay: state.globalData?.historyPlay,
        lock: state.globalData?.lock,
        songLoading: state.globalData.loading,
    }
}

const mapDispatchToprops = (dispatch) => {
    return {
        setCurSong: (song) => dispatch(setCurSong(song)),
        setHistory: (history) => dispatch(setHistory(history)),
        changeLock: (lock) => dispatch(setLock(lock)),
    }
}

function compare() {
    return true;
}

const HistoryItem = forwardRef((props, ref) => {
    function playItem() {
        // console.log(ref);
        props.getSongById(props.id).then(() => {
            ref.current.currentTime = 0;
            props.initMp3();
        })
    }
    return (
        <li onClick={playItem} className={props.id === props.curSong.id ? 'z-sel' : ''}>
            <div className="col col-1">
                {
                    props.id === props.curSong.id && <div className="playicn"></div>
                }
            </div>
            <div className="col col-2">{ props.name }</div>
            <div className="col col-3">
                <div className="icns">
                    <i className="ico icn-del" title="删除" onClick={(e) => delFromPlay(props.id, e)}></i>
                    <i className="ico ico-dl" title="下载"></i>
                    <i className="ico ico-share" title="分享"></i>
                    <i className="j-t ico ico-add" title="收藏"></i>
                </div>
            </div>
            <div className="col col-4">
                <span title={props.singer}>{ props.singer }</span>
            </div>
            <div className="col col-5">{ props.duration }</div>
            <div className="col col-6">
                <i className="ico ico-src"></i>
            </div>
        </li>
    )
})

let timer = null, //playbar锁定计时器
    scrollTimer = null; //歌词滚动锁定计时器
let count = 0;

const playMode = [
    {
        class: 'icn-loop',
        txt: '列表循环',
    },
    {
        class: 'icn-shuffle',
        txt: '随机播放',
    },
    {
        class: 'icn-one',
        txt: '单曲循环',
    }
]

const PlayBar = (props) => {
    const [downUpKey, changeDownUp] = useState(false); //控制能否拖动的开关
    const barRef = useRef(null); //进度条ref
    const mp3 = useRef(null); //音频ref
    const playBtn = useRef(null); //播放按钮
    const prevBtn = useRef(null);
    const nextBtn = useRef(null);
    const [mp3Info, changeMp3Info] = useState({
        isPlay: false, //播放状态play/pause
        duration: 0,
        currentTime: 0,
        loadPC: 0, //加载进度
        progress: 0, //播放进度，0-100
        lyric: [], //歌词数组
        curIdx: 0, //当前歌词下标
    }); // 音频信息
    const {lock, changeLock} = props;
    const [isEnter, changeEnter] = useState(false); //是否鼠标亦如playbar
    const [curIdx, changeCurIdx] = useState(0);
    const [canScrollLrc, changeCanScroll] = useState(true);
    const [showPanel, changeShow] = useState(false); //是否展示歌词面板
    const [songMode, changeMode] = useState(0); //播放模式，循环/随机/单曲

    // 没有歌曲的话，默认设置为张学友 - 咖啡
    if (props.curSong == null) {
        getSongById(188261).then((res) => {
            if (!props.historyPlay || props.historyPlay.length === 0) {
                const { id, details, url } = res;
                props.setHistory([
                    {
                        url,
                        name: details.name,
                        singer: artistsFormat(details.ar),
                        id,
                        alblum: details.al,
                        duration: mediaTimeFormat(details.dt / 1000)
                    }
                ])
            }
        })
    } 

    async function getSongById(defaultId) { //根据id获取歌曲信息
        const id = defaultId ?? props.curSong?.id;
        const url = await commonRequest.getSongUrl(id);
        const res = await commonRequest.getLyric(id);
        const details = await commonRequest.getSongDetails(id);
        props.setCurSong({
            url,
            name: details.name,
            singer: artistsFormat(details.ar),
            lyc: res,
            id,
            alblum: details.al,
            duration: mediaTimeFormat(details.dt)
        })
        return {id, details, url}
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
            if (curTime >= item.time) {
                if (curTime < nextItem.time) {
                    changeCurIdx(i);
                    if (canScrollLrc && !scrollTimer) {
                        const curP = document.querySelectorAll('p.lrc-p')[i];
                        curP.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
                    }
                    break;
                } else if (curTime >= nextItem.time && i === lrc.length - 2) {
                    changeCurIdx(i + 1);
                    if (canScrollLrc && !scrollTimer) {
                        const curP = document.querySelectorAll('p.lrc-p')[i + 1];
                        curP.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
                    }
                    break;
                }
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
        try {
            const timeRanges = mp3.current.buffered;
            const loadProgress = timeRanges.end(timeRanges.length - 1);
            let loadPC = loadProgress / mp3Info.duration * 100;
            if (loadPC <= 0) {loadPC = 0};
            if (loadPC >= 100) {loadPC = 100};
            changeMp3Info({
                ...mp3Info,
                loadPC,
            })
        } catch (err) {
            // console.log(err);
        }
    }
    function onEndPlay() {
        onEnd();
        cutSong();
    }
    function getNextPlay(flag = true) { //在不同模式下计算下一曲的id
        let idx;
        switch (songMode) {
            case 0: //列表循环
                for(let i = 0; i < props.historyPlay.length; i ++) {
                    const song = props.historyPlay[i];
                    if (song.id === props.curSong.id) {
                        idx = i;
                        break;
                    }
                }
                if (idx != null) {
                    flag ? ++idx : --idx;
                }
                //针对首尾情况
                if (idx >= props.historyPlay.length) {
                    idx = 0;
                }
                if (idx < 0) {
                    idx = props.historyPlay.length - 1;
                }
                if (idx != null) {
                    return props.historyPlay[idx]; 
                } else { //有可能历史记录被清除了
                    return props.curSong;
                }

            case 1: //随机模式
                let len = props.historyPlay.length;
                for(let i = 0; i < props.historyPlay.length; i ++) {
                    const song = props.historyPlay[i];
                    if (song.id === props.curSong.id) {
                        idx = i;
                        break;
                    }
                }
                idx = getRandom(0, len, [idx]);
                return props.historyPlay[idx] || props.curSong;
            
            case 2: //单曲循环
                return props.curSong;
        }
    }
    async function cutSong(flag = true) { //播放上/下一首
        const song = getNextPlay(flag);
        if (songMode === 2) {
            mp3.current.play();
            changeMp3Info({
                ...mp3Info,
                isPlay: true
            })
        } else {
            const res = await commonRequest.getLyric(song.id);
            props.setCurSong({...song, lyc: res});
        }
        document.querySelector('.listlyric').scrollTop = 0;
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
    function scrollHandler() { //手动滚动歌词
        scrollTimer && clearTimeout(scrollTimer);
        changeCanScroll(false);
        scrollTimer = setTimeout(() => {
            changeCanScroll(true);
            scrollTimer = null;
        }, 1500);
    }
    function onError(e) { //音频资源出错
        console.log(e);
        const errTIme = mp3.current.currentTime; //记录出错位置
        // message.error('资源出错请重新点击播放');
        getSongById().then(() => {
            mp3.current.currentTime = errTIme;
            mp3.current.play();
            changeMp3Info({
                ...mp3Info,
                isPlay: true
            }) 
        })
    }

    function initMp3() {
        onEnd();
        mp3.current.play();
        changeMp3Info({
            ...mp3Info,
            isPlay: true
        })
    }

    function changePlayMode() {
        songMode >= 2 ? changeMode(0) : changeMode(songMode + 1);
    }

    useEffect(() => {
        console.log('listen')
        if (props.curSong?.id == null) return;
        count ++;
        if (count === 1) {
            return;
        }
        initMp3();
    }, [props.curSong?.id])

    useEffect(() => { //注册键盘快捷键
        document.addEventListener('keydown', (e) => {
            const k = e.key;
            switch (k) {
                case 'p':
                    return playBtn.current.click();
                case 'ArrowLeft':
                    return e.ctrlKey && prevBtn.current.click();
                case 'ArrowRight':
                    return e.ctrlKey && nextBtn.current.click()
                default:
                    return;
            }
        })
    }, [])

    return (
        <div className="g-btmbar" 
        >
            <div 
                className={['m-playbar', lock ? 'm-playbar-lock' : 'm-playbar-unlock'].join(' ')} 
                style={{top: lock ? '-53px' : (isEnter || showPanel ? '-53px' : '-7px')}}
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
                        <span ref={prevBtn} className="prv" title="上一首(ctrl+←)" onClick={() => cutSong(false)}></span>
                        <span ref={playBtn} className={['j-flag', mp3Info.isPlay?'pas':'ply'].join(' ')} title="播放/暂停(p)" onClick={playPause}></span>
                        <span ref={nextBtn} className="nxt" title="下一首(ctrl+→)" onClick={() => cutSong(true)}></span>
                    </div>
                    <Link to={`/song/${props?.curSong?.id}`} className="head j-flag">
                        <img src={props?.curSong?.alblum?.picUrl} alt=""/>
                    </Link>
                    <div className="play">
                        <div className="j-flag words">
                            <Link to={`/song/${props?.curSong?.id}`} className="f-thide name fc1 f-fl" title={props?.curSong?.name}>
                            {props?.curSong?.name}
                            </Link>
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
                                    <span className={`btn f-tdn f-alpha ${props.songLoading&&'z-load'}`} 
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
                        <span 
                        className={`icn ${playMode[songMode].class}`} 
                        title={playMode[songMode].txt }
                        onClick={changePlayMode}>
                        </span>
                        <span className="add f-pr" onClick={() => changeShow(!showPanel)}>
                            <em className="icn icn-list s-fc3" title="播放列表">{ props.historyPlay.length }</em>
                        </span>
                    </div>
                </div>
                <div className="list" style={{display: showPanel?'':'none'}}>
                    <img src={`${props.curSong?.alblum?.picUrl}?imageView&blur=3x3`} className="imgbg j-flag" alt=""/>
                    <div className="listhd">
                        <div className="listhdc">
                            <h4>播放列表(<span className="j-flag">{ props.historyPlay.length }</span>)</h4>
                            <span className="addall">
                                <i className="ico ico-add"></i>
                                收藏全部
                            </span>
                            <span className="line"></span>
                            <span className="clear" onClick={clearHistory}>
                                <i className='ico icn-del'></i>
                                清除
                            </span>
                            <div className="lytit f-ff0 f-thide j-flag">{ props.curSong?.name }</div>
                            <span className="close" onClick={() => changeShow(false)}>关闭</span>
                        </div>
                    </div>
                    <div className="listbd">
                    <div className="listbdc j-flag">
                        <ul className="f-cb">
                            {
                                props.historyPlay.map((item) => {
                                    return (
                                        <HistoryItem 
                                            key={item.id} 
                                            {...item} 
                                            getSongById={getSongById}  
                                            initMp3={initMp3}
                                            ref={mp3}
                                            {...props}
                                        />
                                    )
                                })
                            }
                        </ul>
                        {
                            !props.historyPlay?.length ?
                            <div className="nocnt">
                                <i className="ico ico-face"></i>
                                你还没有添加任何歌曲
                                <p>
                                去首页<Link to="/" className="f-tdu" replace={true}>发现音乐</Link>
                                ，或在<Link to="/Personal" className="f-tdu" replace={true}>我的音乐</Link>
                                收听自己收藏的歌单。
                                </p>
                            </div> : null
                        }
                    </div>
                        <div className="msk2"></div>
                        <div className="listlyric j-flag" onWheel={scrollHandler}>
                            {
                                formatLrc(props.curSong?.lyc||'').map((item, i) => {
                                    return (
                                        <p className={`j-flag lrc-p ${i === curIdx&&'z-sel'}`} key={item.time + Math.random()}>{ item.txt }</p>
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
                onEnded={onEndPlay}
                onError={onError}
            >
            </audio>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToprops)(PlayBar);