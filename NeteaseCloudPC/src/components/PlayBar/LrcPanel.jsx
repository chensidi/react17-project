import { useEffect, useRef, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';

import { formatLrc } from '@/utils/utils';
import { mp3 } from './PlayBar';

let top, left;
function mouseDown(e) {
    key = true;
    const { x, y } = getOffsetXandY();
    const { pageX, pageY } = e;
    [distanceX, distanceY] = [pageX - x, pageY - y];
    console.log(distanceX, distanceY)
}

function onMove(e) {
    if (!key) return;
    const { pageX, pageY } = e;
    lrcRef.current.style.top = top = (pageY - distanceY) + 'px';
    lrcRef.current.style.left = left = (pageX - distanceX) + 'px';
}

function mouseUp() {
    key = false;
}

function getOffsetXandY() {
    const {x, y} = lrcRef.current.getBoundingClientRect();
    return {x, y}
}

let lrcRef;
let [distanceX, distanceY] = [0, 0];
let key = false;
let lrcArr1 = []

const LrcPanel = () => {
    lrcRef = useRef();
    const showLrc = useSelector(state => state.globalData.showLrc);

    const [showMsk, setMsk] = useState(false);
    const dispatch = useDispatch();

    const curSong = useSelector(state => state.globalData.curSong);
    const [lrcArr, setLrcArr] = useState(formatLrc(curSong?.lyc||''));
    lrcArr1 = formatLrc(curSong?.lyc||'')
    const [curIdx, changeCurIdx] = useState(0);

    function bindPlayListener() {
        mp3.current.addEventListener('timeupdate', lrcWithPlay)
    }

    function unbindPlayListener() {
        mp3.current.removeEventListener('timeupdate', lrcWithPlay)
    }
    
    function lrcWithPlay() { //歌词同步
        if (!lrcArr1.length) return;
        if (document.querySelector('.lrc-panel') == null) return;
        for(let i = 0; i < lrcArr1.length - 1; i ++) {
            const curTime = mp3.current.currentTime,
                  item = lrcArr1[i],
                  nextItem = lrcArr1[i + 1];
            if (curTime >= item.time) {
                if (curTime < nextItem.time) {
                    changeCurIdx(i);
                    const curP = document.querySelectorAll('.lrc-wrap>p')[i];
                    curP.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
                    break;
                } else if (curTime >= nextItem.time && i === lrcArr1.length - 2) {
                    changeCurIdx(i + 1);
                    const curP = document.querySelectorAll('.lrc-wrap>p')[i + 1];
                    curP.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
                    break;
                }
            }
        }
    }

    useEffect(() => {
        bindPlayListener();
    }, [])

    useEffect(() => {
        setLrcArr(formatLrc(curSong?.lyc||''))
        lrcArr1 = formatLrc(curSong?.lyc||'');
        changeCurIdx(0)
    }, [curSong?.id])

    useEffect(() => {
        if (showLrc) {
            lrcRef.current.style.top = top 
            lrcRef.current.style.left = left
        }
    }, [showLrc])

    return (
        <CSSTransition
            in={showLrc}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
        <div className={`lrc-panel`}
            ref={lrcRef}
            onMouseDown={mouseDown}
            onMouseMove={onMove}
            onMouseUp={mouseUp}
            onMouseOver={() => setMsk(true)}
            onMouseLeave={() => setMsk(false)}
            style={{backgroundImage: `url(${curSong?.alblum?.picUrl}?imageView&blur=25x25)`}}
        >
            <div className={`lrc-mask ${showMsk?'':'hide'}`}>
                <CloseOutlined className="close-panel" onClick={() => dispatch({type: 'setShowLrc', show: false})} />
            </div>
            <h4 className="title">
                <p className="name">{ curSong?.name }</p>
                <p className="singer">{ curSong?.singer }</p>
            </h4>
            <div className="lrc-area">
                <div className="lrc-wrap">
                    {
                        lrcArr.map((item, i) => {
                            return (
                                <p key={item.time + Math.random()} className={`${i === curIdx&&'z-sel'}`}>{ item.txt }</p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </CSSTransition>
    )
}

export default LrcPanel;